import * as winston from 'winston';

export default class Logger {
    private _logger: winston.Logger;
    private prefix: string = 'RuServer';

    constructor(prefix: string = 'RuServer') {
        this._logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level
                        .charAt(0)
                        .toLocaleUpperCase()}${level.substring(1)}: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.json()
                    ),
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'logs/general.log' }),
            ],
        });
        this.prefix = prefix;
        this._logger.info('[' + this.prefix + '] Logger initialized');
    }

    public error(message: string): void {
        this._logger.error(message);
    }

    public warn(message: string): void {
        this._logger.warn(message);
    }

    public info(message: string): void {
        this._logger.info(message);
    }

    public debug(message: string): void {
        this._logger.debug(message);
    }

    public http(message: string): void {
        this._logger.http(message);
    }
}
