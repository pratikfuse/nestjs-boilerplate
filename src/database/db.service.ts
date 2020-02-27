import { Injectable, Logger } from "@nestjs/common";
import {
    getSession,
    Schema,
} from "mysqlx";
import { DatabaseConfig } from "./database.interface";
import logger from "src/shared/utils/logger";

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
            logger.error(error);
            logger.log(`Retrying in ${options.retry / 1000} seconds`);
            setTimeout(() => {
                this.connect(options);
            }, options.retry);
        }
    }
}
