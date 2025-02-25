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
  async getLastDepth(@Query() query: FilterMenu) {
    const result = await this.menuRepository.getLastDepth();
    return { depth: result };
  }

  @Get()
  @UsePipes(new ZodValidationPipe(FILTER))
  async getMenu(@Query() query: FilterMenu) {
    const result = await this.menuRepository.getMenu(query.idParent);
    console.log(result);

    const root = { children: [] };
    const stack = [{ node: root, depth: 0 }];
    const nilai = [];
    let isGet = false;

    for (let i = 0; i < result.length; i += 1) {
      const item = result[i];

      while (stack[stack.length - 1].depth >= item.depth) {
        stack.pop();
        if (!isGet) nilai.pop();
      }
      if (!isGet) nilai.push(item.id);
      // if (idKategori == item.id) isGet = true;

      const parent = stack[stack.length - 1].node;
      const newNode = {
        id: item.id,
        name: item.name,
        depth: item.depth,
        children: [],
      };
      parent.children.push(newNode);
      stack.push({ node: newNode, depth: item.depth });
    }

    console.log(root);

    const finalResult = [];
    const reformResult = (temp, index) => {
      for (let i = 0; i < temp.length; i += 1) {
        const item = temp[i];

        if (finalResult[item.depth - 1]) {
          finalResult[item.depth - 1].push({ id: item.id, name: item.name });
        } else finalResult[item.depth - 1] = [{ id: item.id, name: item.name }];

        if (
          item.id == nilai[index] &&
          item.children.length > 0 &&
          item.depth < nilai.length
        ) {
          reformResult(item.children, index + 1);
        }
      }
    };
    reformResult(root.children, 0);
    console.log({ finalResult });

    return { menu: finalResult };
  }
}
