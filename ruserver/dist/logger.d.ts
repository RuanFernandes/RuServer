export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    HTTP = 4
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
    private prefix;
    private logLevel;
    constructor(prefix?: string, logLevel?: LogLevel[]);
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    http(message: string): void;
    private writeLog;
}
