"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = void 0;
const IGenericReturns_1 = require("./IGenericReturns");
class InternalError extends IGenericReturns_1.IGenericReturn {
    constructor(message = 'Internal Server Error') {
        super();
        this.statusCode = 500;
        this.message = message;
        return this;
    }
}
exports.InternalError = InternalError;
//# sourceMappingURL=ResponseReturnInternalError.js.map