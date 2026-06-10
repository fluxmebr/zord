import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { Prisma } from '@prisma/client'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let code = 'INTERNAL_ERROR'
    let message = 'Internal server error'

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exResponse = exception.getResponse()
      message = typeof exResponse === 'string' ? exResponse : (exResponse as { message: string }).message
      code = exception.constructor.name.replace('Exception', '').toUpperCase()
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT
        code = 'DUPLICATE_ENTRY'
        message = 'Resource already exists'
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND
        code = 'NOT_FOUND'
        message = 'Resource not found'
      }
    } else {
      this.logger.error('Unhandled exception', exception)
    }

    response.status(status).json({
      error: { code, message },
      timestamp: new Date().toISOString(),
    })
  }
}
