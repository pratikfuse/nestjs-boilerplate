import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators"
import { Logger } from "nestjs-pino";



@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(
        private readonly logger: Logger
    ) {
    }

    intercept(
        context: ExecutionContext, next: CallHandler
    ): Observable<any> {
        
        const now = Date.now();
        const req = context.switchToHttp().getRequest();

        const method = req.method;
        const url = req.url;

        return next.handle()
            .pipe(
                tap(() =>
                    this.logger.log(
                        `${method} ${url} ${Date.now() - now}ms`,
                        context.getClass().name
                    )
                )
            )
    }
}