"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
const fs_1 = require("fs");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["HTTP"] = 4] = "HTTP";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
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
class Logger {
    constructor(prefix = 'RuServer', logLevel) {
        this.prefix = 'RuServer';
        this.logLevel = [LogLevel.ERROR];
        this.prefix = prefix;
        if (logLevel) {
            this.logLevel = logLevel;
        }
    }
    error(message) {
        if (this.logLevel.includes(LogLevel.ERROR)) {
            console.error(`[ERROR|${this.prefix}] ${message}`);
            this.writeLog(message, 'errorslog');
        }
    }
    warn(message) {
        if (this.logLevel.includes(LogLevel.WARN)) {
            console.warn(`[WARN|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }
    info(message) {
        if (this.logLevel.includes(LogLevel.INFO)) {
            console.info(`[INFO|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }
    debug(message) {
        if (this.logLevel.includes(LogLevel.DEBUG)) {
            console.debug(`[DEBUG|${this.prefix}] ${message}`);
            this.writeLog(message);
        }
    }
    http(message) {
        if (this.logLevel.includes(LogLevel.HTTP)) {
            console.debug(`[HTTP|${this.prefix}] ${message}`);
            this.writeLog(message, 'httplog');
        }
    }
    writeLog(message, pref) {
        (0, fs_1.writeFileSync)(pref !== undefined ? pref + '.txt' : 'log.txt', message);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map