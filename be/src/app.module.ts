import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [MenuModule, CommonModule],
})
export class AppModule {}
