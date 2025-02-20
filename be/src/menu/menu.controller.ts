import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { ZodValidationPipe } from '../common/validation.pipe';
import { AddMenu } from './menu.entities';
import { ADD } from './validation/menu.validation';

@Controller('menu')
export class MenuController {
  constructor(private menuRepository: MenuRepository) {}
  @Post()
  @UsePipes(new ZodValidationPipe(ADD))
  async postMenu(@Body() payload: AddMenu) {
    await this.menuRepository.checkDuplicateDepth(
      payload.depth,
      payload.idParent,
    );
    await this.menuRepository.addMenu(payload);
  }
}
