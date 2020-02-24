import { Module, DynamicModule } from "@nestjs/common";
import { DatabaseConfig } from "./database.interface";
import { DatabaseService } from "./db.service";


@Module({})
export class DatabaseModule {
    static  register(options: DatabaseConfig): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: DatabaseService,
                    useValue: new DatabaseService(options)
                }
            ],
            exports: [DatabaseService]
        }
    }
}