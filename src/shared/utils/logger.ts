import { transports, format } from "winston";
import { WinstonModule } from "nest-winston";

const today = new Date();
const logDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp}  ${level}: ${message}`;
});
const logger = WinstonModule.createLogger({
    transports: [
        new (transports.Console)({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
        new (transports.File)({ filename: `./logs/${logDate}-debug.log`, level: "debug" }),
        new (transports.File)({ filename: `./logs/${logDate}-error.log`, level: "error" }),
        new (transports.File)({ filename: `./logs/${logDate}-info.log`, level: "info" })
    ],
    silent: process.env.NODE_ENV === "production",
    ...(process.env.NODE_ENV === "local" ? {
        format: format.combine(
            format.timestamp(),
            format.colorize({
                all: true
            }),
            myFormat
        )
    } : {})
});

export default logger