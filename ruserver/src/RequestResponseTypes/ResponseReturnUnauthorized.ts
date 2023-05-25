import { IGenericReturn } from './IGenericReturns';

export class Unauthorized extends IGenericReturn {
    constructor(message: string = 'Unauthorized') {
        super();

        this.statusCode = 401;
        this.message = message;

        return this;
    }
}
