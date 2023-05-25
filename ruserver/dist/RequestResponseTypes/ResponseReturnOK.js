"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ok = void 0;
const IGenericReturns_1 = require("./IGenericReturns");
class Ok extends IGenericReturns_1.IGenericReturn {
    constructor(message = 'Ok') {
        super();
        this.statusCode = 200;
        this.message = message;
        return this;
    }
}
exports.Ok = Ok;
//# sourceMappingURL=ResponseReturnOK.js.map