import { Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import logger from "./utils/logger";

interface IErrorResponse {
    code: number;
    timestamp: string;
    path: string;
    method: string;
    errors?: any,
    message: string
}
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: any, host: import("@nestjs/common").ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let errors = [];
        if (Array.isArray(exception.message.message)) {
            errors = exception.message.message.map((item: any) => {
                const key = Object.keys(item.constraints)[0];
                return {
                    [item.property]: item.constraints[key]
                };
            });
        }

        const errorResponse: IErrorResponse = {
            code: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            ...(errors.length > 0 ? { errors } : {}),
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception.message.error || exception.message : 'Internal server error',
        };

        logger.error(
            `${request.method} ${request.url} ${status}`, JSON.stringify(errorResponse), 'HttpExceptionFilter'
        )

        response.status(status).json(errorResponse);
    }

}
