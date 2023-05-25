"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = void 0;
const IGenericReturns_1 = require("./IGenericReturns");
class Unauthorized extends IGenericReturns_1.IGenericReturn {
    constructor(message = 'Unauthorized') {
        super();
        this.statusCode = 401;
        this.message = message;
        return this;
    }
}
exports.Unauthorized = Unauthorized;
//# sourceMappingURL=ResponseReturnUnauthorized.js.map