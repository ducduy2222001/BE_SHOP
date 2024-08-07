import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse = exception.getResponse() as any;
    const messageError = exceptionResponse?.message;
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      // you can manipulate the response here
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: Array.isArray(messageError) ? messageError?.[0] : messageError,
      });
  }
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => {
        return {
          status: 200,
          message: 'The operation has been completed successfully',
          data,
        };
      }),
      catchError((error) => {
        const statusCode = error?.status || HttpStatus.INTERNAL_SERVER_ERROR;
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: statusCode,
          message: error.message,
          data: null,
        });
        return of({
          status: statusCode,
          message: error.message,
          data: null,
        });
      }),
    );
  }
}
