import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  async onModuleInit() {
    this.$on('info', (e) => {
      console.info(e);
    });
    this.$on('warn', (e) => {
      console.warn(e);
    });
    this.$on('error', (e) => {
      console.error(e);
    });
    this.$on('query', (e) => {
      console.log(e);
    });
  }
}
