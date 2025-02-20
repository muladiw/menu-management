import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException, PrismaClientValidationError)
export class ErrorFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    let objectResponse: any = {};
    let errorCode = 500;
    let pesan;
    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      objectResponse.pesan = res.error;
      pesan = res.error;
      errorCode = exception.getStatus();
    } else if (exception instanceof ZodError) {
      objectResponse.pesan = exception.errors[0].message;
      pesan = exception.errors[0].message;
      errorCode = 400;
    } else if (exception instanceof PrismaClientValidationError) {
      objectResponse.pesan = 'Kesalahan pada sistem';
      pesan = exception.message;
    } else {
      objectResponse.pesan = exception.message;
      pesan = exception.message;
    }

    console.log('disini', objectResponse);
    if (
      errorCode == 404 &&
      (objectResponse.pesan == 'Not Found' ||
        objectResponse.pesan == 'API tidak ditemukan')
    ) {
      response.status(errorCode).json({ pesan: 'API tidak ditemukan' });
    } else {
      response.status(errorCode).json(objectResponse);
    }
  }
}
