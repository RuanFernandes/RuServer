export default class Logger {
    private _logger;
    constructor();
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    http(message: string): void;
}
