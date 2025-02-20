import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { InvariantError } from '../common/exception.service';
import { AddMenu } from './menu.entities';

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

  async checkDuplicateDepth(depth: number, idParent?: string) {
    try {
      const result = await this.prismaService.menu.findFirst({
        where: {
          depth,
          id_parent: idParent,
        },
      });
      if (result)
        throw new InvariantError('Duplicate depth', 'Duplicate depth');
    } catch (error) {
      if (error instanceof InvariantError) throw error;
      throw new InvariantError('Failed get menu', error);
    }
  }

  async getMenu(idGroup: number) {
    try {
      //     SELECT "id",
      // 	"name",
      // 	1 as  ordered
      // FROM
      // 	menu
      // WHERE
      // 	id_parent IS NULL UNION ALL
      // SELECT
      // 	menu."id",
      // 	menu."name",
      // 	menu."depth" + 1 as ordered
      // FROM
      // 	menu
      // 	INNER JOIN menu final_menu ON menu.id_parent = final_menu.ID

      const result: GroupPermissionSchema[] = await this.prismaService
        .$queryRawUnsafe(`WITH RECURSIVE final_module (
          id,
          label,
          ordered,
          level,
          url
        ) AS (
          SELECT
            id,
            label,
            1 as ordered,
            level,
            url
          FROM role_module
          WHERE
            id_parent is null
          union all
          select
            role_module.id,
            role_module.label,
            final_module.ordered + 1 as ordered,
            role_module.level,
            role_module.url
          from role_module
          inner join final_module on
          role_module.id_parent = final_module.id
        )
        SELECT
          api.id id_api,
          final_module.id id_role_module,
          final_module.label label_role_module,
          final_module.url,
          api.additional_url,
          role_action.label label_role_action,
          role_permission.id_role_group is_access
        FROM
          final_module
        LEFT JOIN api ON
          api.id_role_module = final_module.id
        LEFT JOIN role_permission ON
          role_permission.id_api = api.id AND role_permission.id_role_group = ${idGroup}
        LEFT JOIN role_action ON
          role_action.id = api.id_role_action
        ORDER BY
          final_module.ordered,
          final_module.level,
          final_module.label;`);

      const finalResult = [];
      for (let i = 0; i < result.length; i++) {
        const item = result[i];

        finalResult.push(
          new GetGroupPermission({
            idApi: item.id_api
              ? await this.cryptoService.encryptId(item.id_api)
              : null,
            idModule: await this.cryptoService.encryptId(item.id_role_module),
            ...item,
          }),
        );
      }
      return finalResult;
    } catch (error) {
      throw new InvariantError('Group izin tidak ditemukan', error);
    }
  }
}
