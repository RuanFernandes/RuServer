import { writeFileSync } from 'fs';

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    HTTP = 4,
}

/**
 * Logger class
 * @class Logger
 * @description Logger class
 * @export Logger
 * @example
 * import Logger from 'logger';
 *
 * const logger = new Logger('RuServer', [LogLevel.ERROR, LogLevel.WARN]);
 * logger.error('Error message');
 * logger.warn('Warn message');
 * logger.info('Info message');
 * logger.debug('Debug message');
 * logger.http('Http message');
 **/
export default class Logger {
    private prefix: string = 'RuServer';
    private logLevel: LogLevel[] = [LogLevel.ERROR];

    constructor(prefix: string = 'RuServer', logLevel?: LogLevel[]) {
        this.prefix = prefix;
        if (logLevel) {
            this.logLevel = logLevel;
        }
    }

    public error(message: string): void {
        if (this.logLevel.includes(LogLevel.ERROR)) {
            console.error(`[ERROR|${this.prefix}] ${message}`);
            this.writeLog(message, 'errorslog');
        }
    }

    public warn(message: string): void {
        if (this.logLevel.includes(LogLevel.WARN)) {
            console.warn(`[WARN|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }

    public info(message: string): void {
        if (this.logLevel.includes(LogLevel.INFO)) {
            console.info(`[INFO|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }

    public debug(message: string): void {
        if (this.logLevel.includes(LogLevel.DEBUG)) {
            console.debug(`[DEBUG|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }

    public http(message: string): void {
        if (this.logLevel.includes(LogLevel.HTTP)) {
            console.debug(`[HTTP|${this.prefix}] ${message}`);
            this.writeLog(message, 'httplog');
        }
    }

    private writeLog(message: string, pref?: string): void {
        writeFileSync(pref !== undefined ? pref + '.txt' : 'log.txt', message);
    }
}
