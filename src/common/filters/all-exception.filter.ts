import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { flatten } from 'lodash';
import { ValidationError } from 'class-validator';
import { ValidationUtility } from '../utilities/validation.utility';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = this.getStatusCode(exception);
    let errorMessages = [];
    switch (true) {
      case exception instanceof HttpException || typeof exception.getResponse === 'function':
        const response = exception.getResponse();
        errorMessages = this.parseMessages(response);
        break;
      case this.isValidationError(exception):
        errorMessages = ValidationUtility.parseErrors(exception);
        break;
      case Array.isArray(exception):
        exception.forEach((item) => {
          errorMessages = [...errorMessages, ...this.parseMessages(item)];
        });
        break;
      default:
        errorMessages = this.parseMessages(exception);
    }
    if (httpStatus === 500) {
      Logger.error(exception);
    }
    const responseBody = {
      statusCode: httpStatus,
      errorMessages: flatten(errorMessages),
      data: null,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  parseMessages(data: any): string[] {
    return typeof data.getMessages === 'function'
      ? (data.getMessages() as string[])
      : typeof data.getMessage === 'function'
      ? [data.getMessage()]
      : data.message
      ? [data.message]
      : [data.toString()];
  }

  getStatusCode(exception: any): number {
    if (this.isValidationError(exception)) {
      return 400;
    }
    return exception instanceof HttpException || typeof exception.getStatus === 'function'
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  isValidationError(exception: any): boolean {
    return Array.isArray(exception) && exception.length && exception[0] instanceof ValidationError;
  }
}
