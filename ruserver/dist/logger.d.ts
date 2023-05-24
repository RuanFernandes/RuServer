export default class Logger {
    private _logger;
    private prefix;
    constructor(prefix?: string);
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    http(message: string): void;
}
