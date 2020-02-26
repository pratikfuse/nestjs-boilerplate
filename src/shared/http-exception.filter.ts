import { Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Logger } from "nestjs-pino";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: Logger
    ) { }
    catch(exception: any, host: import("@nestjs/common").ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorResponse = {
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception.message.error || exception.message || null
                    : 'Internal server error',
        };

        this.logger.error(
            `${request.method} ${request.url}`, errorResponse.message
        );
        response.status(200).json(errorResponse);
    }

}
