"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.Ok = exports.InternalError = exports.BadRequest = exports.NoContentOK = void 0;
const ResponseReturnUnauthorized_1 = require("./ResponseReturnUnauthorized");
Object.defineProperty(exports, "Unauthorized", { enumerable: true, get: function () { return ResponseReturnUnauthorized_1.Unauthorized; } });
const ResponseReturnOK_1 = require("./ResponseReturnOK");
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return ResponseReturnOK_1.Ok; } });
const ResponseReturnInternalError_1 = require("./ResponseReturnInternalError");
Object.defineProperty(exports, "InternalError", { enumerable: true, get: function () { return ResponseReturnInternalError_1.InternalError; } });
const ResponseReturnBadReq_1 = require("./ResponseReturnBadReq");
Object.defineProperty(exports, "BadRequest", { enumerable: true, get: function () { return ResponseReturnBadReq_1.BadRequest; } });
const ResponseReturnNoContentSuccess_1 = require("./ResponseReturnNoContentSuccess");
Object.defineProperty(exports, "NoContentOK", { enumerable: true, get: function () { return ResponseReturnNoContentSuccess_1.NoContentOK; } });
//# sourceMappingURL=index.js.map