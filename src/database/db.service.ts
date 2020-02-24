import { Injectable } from "@nestjs/common";
import {
    getSession,
    Schema,
} from "mysqlx";
import { DatabaseConfig } from "./database.interface";

@Injectable()
export class DatabaseService {
    db: Schema;
    constructor(options: DatabaseConfig) {
        this.connect(options)
    }

    // initialize database connection
    private async connect(options: DatabaseConfig) {
        try {
            const session = await getSession(options)
            this.db = session.getSchema(options.schema)
            console.log(`Connected to database at ${options.host}`)
        } catch (error) {
            console.error(error)
            console.error(`Retrying in ${options.retry / 1000} seconds`)
            setTimeout(() => {
                this.connect(options)
            }, options.retry)

        }
    }
}