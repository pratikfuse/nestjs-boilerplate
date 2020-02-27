import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import logger from "./utils/logger";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const method = req.method;
        const url = req.url;

        return next.handle()
            .pipe(
                tap(() =>
                    logger.log(`${method} ${url}  ${req.statusCode} ${Date.now() - now}ms`,context.getClass().name)
                )
            );
    }
}
