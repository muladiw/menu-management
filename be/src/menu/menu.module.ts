import { Module } from '@nestjs/common';
import { MenuRepository } from './menu.repository';
import { MenuController } from './menu.controller';

@Module({
  providers: [MenuRepository],
  controllers: [MenuController],
})
export class MenuModule {}
