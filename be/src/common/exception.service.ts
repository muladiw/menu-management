import { BadRequestException, ForbiddenException, HttpStatus, NotFoundException, UnauthorizedException } from "@nestjs/common";

export class InvariantError extends BadRequestException {
  constructor(message: string, error) {
    super({
      error: message,
      status: HttpStatus.BAD_REQUEST,
    }, { cause: error });
  }
}

export class AuthorizationError extends ForbiddenException {
  constructor(message: string) {
    super({
      error: message,
      status: HttpStatus.FORBIDDEN,
    });
  }
}

export class AuthenticationError extends UnauthorizedException {
  constructor(message: string) {
    super({
      error: message,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class NotFoundError extends NotFoundException {
  constructor(message: string) {
    super({
      error: message,
      status: HttpStatus.NOT_FOUND,
    });
  }
}