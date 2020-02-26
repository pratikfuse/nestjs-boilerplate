import { Injectable, Logger } from "@nestjs/common";
import {
    getSession,
    Schema,
} from "mysqlx";
import { DatabaseConfig } from "./database.interface";

@Injectable()
export class DatabaseService {
    db: Schema;
    constructor(
        options: DatabaseConfig) {
        this.connect(options);
    }

    // initialize database connection
    private async connect(options: DatabaseConfig) {
        try {
            const session = await getSession(options);
            this.db = session.getSchema(options.schema);
        } catch (error) {
            Logger.error(error);
            Logger.log(`Retrying in ${options.retry / 1000} seconds`);
            setTimeout(() => {
                this.connect(options);
            }, options.retry);
        }
    }
}
