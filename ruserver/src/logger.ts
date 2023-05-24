import * as winston from 'winston';

export default class Logger {
    private _logger: winston.Logger;

    constructor() {
        const logLevels = {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            debug: 'blue',
            http: 'magenta',
        };

        this._logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(({ level, message, timestamp }) => {
                    return `[${timestamp}] ${level}: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'logs/http_log.log' }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
            ],
        });

        winston.addColors(logLevels);

        this._logger.info('Logger initialized');
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
