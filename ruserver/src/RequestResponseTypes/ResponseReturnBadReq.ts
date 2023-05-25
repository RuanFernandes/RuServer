import { IGenericReturn } from './IGenericReturns';

export class BadRequest extends IGenericReturn {
    constructor(message: string = 'Bad Request') {
        super();

        this.statusCode = 400;
        this.message = message;

        return this;
    }
}
