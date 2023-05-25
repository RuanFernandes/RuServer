"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const IGenericReturns_1 = require("./IGenericReturns");
class BadRequest extends IGenericReturns_1.IGenericReturn {
    constructor(message = 'Bad Request') {
        super();
        this.statusCode = 400;
        this.message = message;
        return this;
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=ResponseReturnBadReq.js.map