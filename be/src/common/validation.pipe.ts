import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ZodSchema } from 'zod';
import { InvariantError } from './exception.service';

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private validationClass?: any,
  ) {}

  transform(value: unknown, { metatype }: ArgumentMetadata) {
    let result = value;

    if (
      !this.validationClass ||
      (this.validationClass && this.validationClass == metatype)
    ) {
      let transform = {};
      try {
        transform = plainToInstance(metatype, value);
      } catch (error) {
        throw new InvariantError('Data tidak sesuai', error);
      }

      result = this.schema.parse(transform);
    }
    return result;
  }
}

export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // "value" is an object containing the file's attributes and metadata
    // console.log(value);

    // const oneKb = 1000;
    // return value.size < oneKb;
    return value;
  }
}
