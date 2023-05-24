"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston = __importStar(require("winston"));
class Logger {
    constructor() {
        this._logger = winston.createLogger({
            level: 'debug',
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ level, message, timestamp }) => {
                return `[${timestamp}] ${level
                    .charAt(0)
                    .toLocaleUpperCase()}${level.substring(1)}: ${message}`;
            })),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'logs/general.log' }),
            ],
        });
        this._logger.info('Logger initialized');
    }
    error(message) {
        this._logger.error(message);
    }
    warn(message) {
        this._logger.warn(message);
    }
    info(message) {
        this._logger.info(message);
    }
    debug(message) {
        this._logger.debug(message);
    }
    http(message) {
        this._logger.http(message);
    }
}
exports.default = Logger;
//# sourceMappingURL=logger.js.map