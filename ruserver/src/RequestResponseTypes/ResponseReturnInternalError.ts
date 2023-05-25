import { IGenericReturn } from './IGenericReturns';

export class InternalError extends IGenericReturn {
    constructor(message: string = 'Internal Server Error') {
        super();

        this.statusCode = 500;
        this.message = message;

        return this;
    }
}
