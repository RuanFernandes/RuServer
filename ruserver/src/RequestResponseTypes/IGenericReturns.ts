export abstract class IGenericReturn {
    statusCode: number;
    message?: string | { [key: string]: any };

    constructor() {
        this.message = 'Request Response Error';
        this.statusCode = 500;
    }
}
