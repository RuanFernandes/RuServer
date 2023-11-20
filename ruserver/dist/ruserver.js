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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.RuServer = exports.Controller = exports.Patch = exports.Put = exports.Delete = exports.Post = exports.Get = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const logger_1 = __importStar(require("./logger"));
exports.Logger = logger_1.default;
const GET_METADATA_KEY = 'express:router:get';
const POST_METADATA_KEY = 'express:router:post';
const PUT_METADATA_KEY = 'express:router:put';
const DELETE_METADATA_KEY = 'express:router:delete';
const PATCH_METADATA_KEY = 'express:router:patch';
/**
 * @class ExpressServer
 * @description Classe responsável por iniciar o servidor express
 * @example const server = new ExpressServer(8080);
 * server.start();
 * @author Ruan Fernandes
 */
class RuServer {
    /**
     *
     * @param port Porta que o servidor irá rodar
     */
    constructor(port = 3000, logLevels) {
        this.port = port;
        this._logLevels = [logger_1.LogLevel.ERROR];
        this._paramMap = new Map();
        this.routes = new Array();
        this._paramMap = new Map();
        this._logger = new logger_1.default('RuServer', logLevels || this._logLevels);
        this._paramMap.set('logger', this._logger);
        this.app = (0, express_1.default)();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use((0, cors_1.default)());
    }
    /**
     * @description Retorna o logger da aplicação
     * @returns Logger
     */
    get logger() {
        return this._logger;
    }
    /**
     *
     * @description Inicia o servidor na porta definida no construtor
     */
    start() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }
    addRoute(method, path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === method;
        });
        if (existingRoute) {
            throw new Error(`Route ${method}/${existingRoute.path} already exists.`);
        }
        switch (method) {
            case 'GET':
                this.app.get(path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                }));
                break;
            case 'POST':
                this.app.post(path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                }));
                break;
            case 'PUT':
                this.app.put(path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                }));
                break;
            case 'DELETE':
                this.app.delete(path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                }));
                break;
            case 'PATCH':
                this.app.patch(path, (req, res) => __awaiter(this, void 0, void 0, function* () {
                    const data = yield callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                }));
                break;
        }
        this.routes.push({
            method: method,
            path: path,
            description: description,
        });
    }
    /**
     * @description Adiciona um parametro adicional para ser utilizado nas rotas do servidor
     */
    addParam(key, value) {
        this._paramMap.set(key, value);
    }
    /**
     *
     *  @description Retorna todas as rotas registradas no servidor
     *  @example server.getRoutes(type: 'GET')
     *
     *
     */
    getRoutes(type) {
        const data = this.routes.filter((route) => {
            return route.method === type;
        });
        const PathnDescription = data.map((route) => {
            return `ROUTE: ${route.path}, DESCRIPTION: ${route.description}`;
        });
        return PathnDescription.join('\n');
    }
    /**
     * @description Funciona igual o getRoutes, porém retorna um array de objetos
     */
    getRoutesArray(type) {
        const data = this.routes.filter((route) => {
            return route.method === type;
        });
        return data;
    }
    /**
     * @description Funciona igual o getRoutes, porém retorna um array de keys
     */
    getRoutesKeys(type, key) {
        const data = this.routes.filter((route) => {
            return route.method === type;
        });
        const keys = data.map((route) => {
            return route[key];
        });
        return keys;
    }
    /**
     * @description Carrega as rotas do servidor por modulos
     */
    loadControllers(apiData) {
        apiData.forEach((element) => {
            // Get Routes
            const getRoutes = Reflect.getMetadata(GET_METADATA_KEY, element);
            if (getRoutes) {
                getRoutes.forEach((route) => {
                    this.addRoute('GET', route.path, route.callback, route.description || '');
                });
            }
            // Post Routes
            const postRoutes = Reflect.getMetadata(POST_METADATA_KEY, element);
            if (postRoutes) {
                postRoutes.forEach((route) => {
                    this.addRoute('POST', route.path, route.callback, route.description || '');
                });
            }
            // Put Routes
            const putRoutes = Reflect.getMetadata(PUT_METADATA_KEY, element);
            if (putRoutes) {
                putRoutes.forEach((route) => {
                    this.addRoute('PUT', route.path, route.callback, route.description || '');
                });
            }
            // Delete Routes
            const deleteRoutes = Reflect.getMetadata(DELETE_METADATA_KEY, element);
            if (deleteRoutes) {
                deleteRoutes.forEach((route) => {
                    this.addRoute('DELETE', route.path, route.callback, route.description || '');
                });
            }
            // Patch Routes
            const patchRoutes = Reflect.getMetadata(PATCH_METADATA_KEY, element);
            if (patchRoutes) {
                patchRoutes.forEach((route) => {
                    this.addRoute('PATCH', route.path, route.callback, route.description || '');
                });
            }
        });
    }
}
exports.RuServer = RuServer;
function Get(path = '', description = '') {
    return function (target, propertyKey) {
        const getRoutes = Reflect.getMetadata(GET_METADATA_KEY, target.constructor) || [];
        const callback = target[propertyKey];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'GET',
        };
        Reflect.defineMetadata(GET_METADATA_KEY, [...getRoutes, route], target.constructor);
        const metadata = Reflect.getMetadata(GET_METADATA_KEY, target.constructor, propertyKey) || [];
        metadata.push({ type: 'GET', path, description });
        Reflect.defineMetadata(GET_METADATA_KEY, metadata, target.constructor, propertyKey);
    };
}
exports.Get = Get;
function Post(path = '', description = '') {
    return function (target, propertyKey) {
        const postRoutes = Reflect.getMetadata(POST_METADATA_KEY, target.constructor) || [];
        const callback = target[propertyKey];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'POST',
        };
        Reflect.defineMetadata(POST_METADATA_KEY, [...postRoutes, route], target.constructor);
        const metadata = Reflect.getMetadata(POST_METADATA_KEY, target.constructor, propertyKey) || [];
        metadata.push({ type: 'POST', path, description });
        Reflect.defineMetadata(POST_METADATA_KEY, metadata, target.constructor, propertyKey);
    };
}
exports.Post = Post;
function Delete(path = '', description = '') {
    return function (target, propertyKey) {
        const deleteRoutes = Reflect.getMetadata(DELETE_METADATA_KEY, target.constructor) || [];
        const callback = target[propertyKey];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'DELETE',
        };
        Reflect.defineMetadata(DELETE_METADATA_KEY, [...deleteRoutes, route], target.constructor);
        const metadata = Reflect.getMetadata(DELETE_METADATA_KEY, target.constructor, propertyKey) || [];
        metadata.push({ type: 'DELETE', path, description });
        Reflect.defineMetadata(DELETE_METADATA_KEY, metadata, target.constructor, propertyKey);
    };
}
exports.Delete = Delete;
function Put(path = '', description = '') {
    return function (target, propertyKey) {
        const putRoutes = Reflect.getMetadata(PUT_METADATA_KEY, target.constructor) || [];
        const callback = target[propertyKey];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'PUT',
        };
        Reflect.defineMetadata(PUT_METADATA_KEY, [...putRoutes, route], target.constructor);
        const metadata = Reflect.getMetadata(PUT_METADATA_KEY, target.constructor, propertyKey) || [];
        metadata.push({ type: 'PUT', path, description });
        Reflect.defineMetadata(PUT_METADATA_KEY, metadata, target.constructor, propertyKey);
    };
}
exports.Put = Put;
function Patch(path = '', description = '') {
    return function (target, propertyKey) {
        const patchRoutes = Reflect.getMetadata(PATCH_METADATA_KEY, target.constructor) || [];
        const callback = target[propertyKey];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'PATCH',
        };
        Reflect.defineMetadata(PATCH_METADATA_KEY, [...patchRoutes, route], target.constructor);
        const metadata = Reflect.getMetadata(PATCH_METADATA_KEY, target.constructor, propertyKey) || [];
        metadata.push({ type: 'PATCH', path, description });
        Reflect.defineMetadata(PATCH_METADATA_KEY, metadata, target.constructor, propertyKey);
    };
}
exports.Patch = Patch;
class Controlador {
    constructor() { }
}
function Controller() {
    return function (constructor) {
        Object.setPrototypeOf(constructor.prototype, new Controlador());
    };
}
exports.Controller = Controller;
//# sourceMappingURL=ruserver.js.map