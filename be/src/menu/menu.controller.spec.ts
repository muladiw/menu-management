import { Test, TestingModule } from '@nestjs/testing';
import { MenuController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { AppModule } from '../app.module';
import { InvariantError } from '../common/exception.service';
import { AddMenu } from './menu.entities';

describe('MenuController', () => {
  let controller: MenuController;
  let provider: MenuRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = module.get<MenuController>(MenuController);
    provider = module.get<MenuRepository>(MenuRepository);
  });

  describe('addMenu function', () => {
    it('should orchestrating add menu action correctly', async () => {
      // Arrange
      const mockUseCasePayload: AddMenu = {
        name: 'name',
        depth: 1,
      };

      /** creating dependency of use case */
      /** mocking needed function */
      jest
        .spyOn(provider, 'checkDuplicateDepth')
        .mockImplementation(() => Promise.resolve());
      jest
        .spyOn(provider, 'addMenu')
        .mockImplementation(() => Promise.resolve());

      // Action & Assert
      await expect(
        controller.postMenu(mockUseCasePayload),
      ).resolves.not.toThrow(InvariantError);
      expect(provider.checkDuplicateDepth).toHaveBeenCalledWith(
        mockUseCasePayload.depth,
        mockUseCasePayload.idParent,
      );
      expect(provider.addMenu).toHaveBeenCalledWith(mockUseCasePayload);
    });
  });
  describe('getLastDepth function', () => {
    it('should orchestrating get last depth action correctly', async () => {
      // Arrange
      const mockResult = 1;

      /** creating dependency of use case */
      /** mocking needed function */
      jest
        .spyOn(provider, 'getLastDepth')
        .mockImplementation(() => Promise.resolve(mockResult));

      // Action
      const result = await controller.getLastDepth();

      // Assert
      expect(result).toEqual({ depth: mockResult });
      expect(provider.getLastDepth).toHaveBeenCalledWith();
    });
  });
  describe('getMenu function', () => {
    it('should orchestrating get menu action correctly', async () => {
      // Arrange
      const mockUseCasePayload = { idParent: 'idParent' };
      const mockResult = [];

      /** creating dependency of use case */
      /** mocking needed function */
      jest
        .spyOn(provider, 'getMenu')
        .mockImplementation(() => Promise.resolve(mockResult));

      // Action
      const result = await controller.getMenu(mockUseCasePayload);

      // Assert
      expect(result).toEqual({ menu: mockResult });
      expect(provider.getMenu).toHaveBeenCalledWith(
        mockUseCasePayload.idParent,
      );
    });
  });
});
