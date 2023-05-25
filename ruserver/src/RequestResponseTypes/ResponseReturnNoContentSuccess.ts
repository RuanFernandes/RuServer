import { IGenericReturn } from './IGenericReturns';

export class NoContentOK extends IGenericReturn {
    constructor(message: string = 'No Content') {
        super();

        this.statusCode = 204;
        this.message = message;

        return this;
    }
}
