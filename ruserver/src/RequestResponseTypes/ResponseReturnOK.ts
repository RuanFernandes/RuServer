import { IGenericReturn } from './IGenericReturns';

export class Ok extends IGenericReturn {
    constructor(message: string = 'Ok') {
        super();

        this.statusCode = 200;
        this.message = message;

        return this;
    }
}
