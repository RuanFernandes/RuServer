"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContentOK = void 0;
const IGenericReturns_1 = require("./IGenericReturns");
class NoContentOK extends IGenericReturns_1.IGenericReturn {
    constructor(message = 'No Content') {
        super();
        this.statusCode = 204;
        this.message = message;
        return this;
    }
}
exports.NoContentOK = NoContentOK;
//# sourceMappingURL=ResponseReturnNoContentSuccess.js.map