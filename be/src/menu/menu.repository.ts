import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { InvariantError } from '../common/exception.service';
import { AddMenu, AddedMenu } from './menu.entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuRepository {
  constructor(private prismaService: PrismaService) {}
  async addMenu({ name, idParent, depth }: AddMenu) {
    try {
      await this.prismaService.menu.create({
        data: {
          name,
          id_parent: idParent,
          depth,
        },
      });
    } catch (error) {
      throw new InvariantError('Failed add menu', error);
    }
  }

  async getMenuFirstCommon(
    where: Prisma.menuWhereInput = {},
    optional: Prisma.menuFindManyArgs = {},
  ) {
    try {
      return await this.prismaService.menu.findFirst({
        ...optional,
        where,
      });
    } catch (error) {
      if (error instanceof InvariantError) throw error;
      throw new InvariantError('Failed get menu', error);
    }
  }

  async checkDuplicateDepth(depth: number, idParent?: string) {
    const result = await this.getMenuFirstCommon({
      depth,
      id_parent: idParent,
    });
    if (result) throw new InvariantError('Duplicate depth', 'Duplicate depth');
  }

  async getLastDepth(idParent = null) {
    const result = await this.getMenuFirstCommon(
      { id_parent: idParent },
      { orderBy: { depth: 'desc' } },
    );
    if (result) return result.depth;
    else return 0;
  }

  async getMenu(idParent?: string) {
    let where = 'IS NULL';
    if (idParent) where = `= '${idParent}'`;
    try {
      const result: AddedMenu[] = await this.prismaService
        .$queryRawUnsafe(`WITH RECURSIVE final_menu ( "id", "name", ordered, "depth" ) AS (
          SELECT
            "id",
            "name",
            1 AS ordered,
            "depth" 
          FROM
            menu 
          WHERE
            id_parent ${where} UNION ALL
          SELECT
            menu."id",
            menu."name",
            final_menu.ordered + 1 AS ordered,
            menu."depth" 
          FROM
            menu
            INNER JOIN final_menu ON menu.id_parent = final_menu.ID 
          ) SELECT
          "id", "name", "depth" 
        FROM
          final_menu 
        ORDER BY
          ordered,
          "depth"`);
      return result;
    } catch (error) {
      throw new InvariantError('Failed get menu', error);
    }
  }
}
