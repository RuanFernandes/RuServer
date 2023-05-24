"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuServer = exports.Controller = exports.Patch = exports.Put = exports.Delete = exports.Post = exports.Get = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
require("reflect-metadata");
const logger_1 = __importDefault(require("./logger"));
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
    constructor(port = 3000) {
        this.port = port;
        this.routes = new Array();
        this.app = (0, express_1.default)();
        this._logger = new logger_1.default();
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
    /**
     *
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo GET
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    addGetRoute(path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'GET';
        });
        if (existingRoute) {
            throw new Error(`Route GET/${existingRoute.path} already exists.`);
        }
        this.app.get(path, (req, res) => {
            const data = callback(req, this.logger);
            res.send(data);
        });
        this.routes.push({
            method: 'GET',
            path: path,
            description: description,
        });
    }
    /**
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo POST
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    addPostRoute(path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'POST';
        });
        if (existingRoute) {
            throw new Error(`Route POST/${existingRoute.path} already exists.`);
        }
        this.app.post(path, (req, res) => {
            const data = callback(req, this.logger);
            res.send(data);
        });
        this.routes.push({
            method: 'POST',
            path: path,
            description: description,
        });
    }
    /**
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo PUT
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    addPutRoute(path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'PUT';
        });
        if (existingRoute) {
            throw new Error(`Route PUT/${existingRoute.path} already exists.`);
        }
        this.app.put(path, (req, res) => {
            const data = callback(req, this.logger);
            res.send(data);
        });
        this.routes.push({
            method: 'PUT',
            path: path,
            description: description,
        });
    }
    /**
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo DELETE
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    addDeleteRoute(path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'DELETE';
        });
        if (existingRoute) {
            throw new Error(`Route DELETE/${existingRoute.path} already exists.`);
        }
        this.app.delete(path, (req, res) => {
            const data = callback(req, this.logger);
            res.send(data);
        });
        this.routes.push({
            method: 'DELETE',
            path: path,
            description: description,
        });
    }
    /**
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo PATCH
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    addPatchRoute(path, callback, description) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'PATCH';
        });
        if (existingRoute) {
            throw new Error(`Route PATCH/${existingRoute.path} already exists.`);
        }
        this.app.patch(path, (req, res) => {
            const data = callback(req, this.logger);
            res.send(data);
        });
        this.routes.push({
            method: 'PATCH',
            path: path,
            description: description,
        });
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
                    this.addGetRoute(route.path, route.callback, route.description || '');
                });
            }
            // Post Routes
            const postRoutes = Reflect.getMetadata(POST_METADATA_KEY, element);
            if (postRoutes) {
                postRoutes.forEach((route) => {
                    this.addPostRoute(route.path, route.callback, route.description || '');
                });
            }
            // Put Routes
            const putRoutes = Reflect.getMetadata(PUT_METADATA_KEY, element);
            if (putRoutes) {
                putRoutes.forEach((route) => {
                    this.addPutRoute(route.path, route.callback, route.description || '');
                });
            }
            // Delete Routes
            const deleteRoutes = Reflect.getMetadata(DELETE_METADATA_KEY, element);
            if (deleteRoutes) {
                deleteRoutes.forEach((route) => {
                    this.addDeleteRoute(route.path, route.callback, route.description || '');
                });
            }
            // Patch Routes
            const patchRoutes = Reflect.getMetadata(PATCH_METADATA_KEY, element);
            if (patchRoutes) {
                patchRoutes.forEach((route) => {
                    this.addPatchRoute(route.path, route.callback, route.description || '');
                });
            }
        });
    }
}
exports.RuServer = RuServer;
function Get(path, description = '') {
    return function (target, propertyKey) {
        const getRoutes = Reflect.getMetadata(GET_METADATA_KEY, target.constructor) || [];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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
function Post(path, description = '') {
    return function (target, propertyKey) {
        const postRoutes = Reflect.getMetadata(POST_METADATA_KEY, target.constructor) || [];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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
function Delete(path, description = '') {
    return function (target, propertyKey) {
        const deleteRoutes = Reflect.getMetadata(DELETE_METADATA_KEY, target.constructor) || [];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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
function Put(path, description = '') {
    return function (target, propertyKey) {
        const putRoutes = Reflect.getMetadata(PUT_METADATA_KEY, target.constructor) || [];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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
function Patch(path, description = '') {
    return function (target, propertyKey) {
        const patchRoutes = Reflect.getMetadata(PATCH_METADATA_KEY, target.constructor) || [];
        const route = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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