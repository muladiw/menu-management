import { MenuRepository } from './menu.repository';
import { MenuTableTestHelper } from '../test/MenuTableTestHelper';
import { InvariantError } from '../common/exception.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';

describe('MenuRepository', () => {
  let menuRepository: MenuRepository;

  afterAll(async () => {
    await MenuTableTestHelper.cleanTable();
  });
  let mockMenu;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    menuRepository = module.get<MenuRepository>(MenuRepository);
  });
  describe('addMenu function', () => {
    it('should persist add menu correctly', async () => {
      // Arrange
      const payload = {
        name: 'name',
        depth: 1,
      };

      // Action
      await expect(menuRepository.addMenu(payload)).resolves.not.toThrow(
        InvariantError,
      );

      // Assert
      const result = await MenuTableTestHelper.getMenuByWhere({
        name: payload.name,
      });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBeDefined();
      expect(result[0].name).toEqual(payload.name);
      expect(result[0].depth).toEqual(payload.depth);
      expect(result[0].id_parent).toEqual(null);
    });
  });
  describe('checkDuplicateDepth function', () => {
    it('should persist add menu correctly', async () => {
      // Arrange
      const payload = 2;

      // Action & Assert
      await expect(
        menuRepository.checkDuplicateDepth(payload),
      ).resolves.not.toThrow(InvariantError);
    });
  });
  describe('need menu data', () => {
    beforeAll(async () => {
      await MenuTableTestHelper.cleanTable();
      mockMenu = [await MenuTableTestHelper.addMenu({ name: 'dashboard' })];
    });
    afterAll(async () => {
      await MenuTableTestHelper.cleanTable();
    });
    describe('getLastDepth function', () => {
      it('should persist get last depth menu correctly', async () => {
        // Arrange
        // Action
        const result = await menuRepository.getLastDepth();

        // Assert
        expect(result).toEqual(1);
      });
    });
    describe('getMenu function', () => {
      it('should persist get menu correctly', async () => {
        // Arrange
        // Action
        const result = await menuRepository.getMenu();

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0].id).toEqual(mockMenu[0].id);
        expect(result[0].name).toEqual(mockMenu[0].name);
        expect(result[0].depth).toEqual(mockMenu[0].depth);
      });
    });
  });
});
