import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { ZodValidationPipe } from '../common/validation.pipe';
import { AddMenu, FilterMenu } from './menu.entities';
import { ADD, FILTER } from './validation/menu.validation';

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

  @Get('last-depth')
  async getLastDepth() {
    const result = await this.menuRepository.getLastDepth();
    return { depth: result };
  }

  @Get()
  @UsePipes(new ZodValidationPipe(FILTER))
  async getMenu(@Query() query: FilterMenu) {
    const result = await this.menuRepository.getMenu(query.idParent);
    return { menu: result };
  }
}
