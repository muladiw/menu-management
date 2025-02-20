/* istanbul ignore file */
import { PrismaService } from '../common/prisma.service';
const prismaService = new PrismaService();

export const MenuTableTestHelper = {
  addMenu({ id = 'menu-123', name = 'name', depth = 1, idParent = null }) {
    return prismaService.menu.create({
      data: {
        id,
        name,
        depth,
        id_parent: idParent,
      },
    });
  },
  getMenu() {
    return prismaService.menu.findMany({});
  },
  getMenuByWhere(where) {
    return prismaService.menu.findMany({ where });
  },
  addManyMenu(data) {
    return prismaService.menu.createMany({ data });
  },
  async cleanTable() {
    await prismaService.$queryRawUnsafe(
      'TRUNCATE TABLE menu RESTART IDENTITY CASCADE',
    );
  },
};
