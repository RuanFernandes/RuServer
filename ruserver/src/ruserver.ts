import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';
import Logger, { LogLevel } from './logger';
import { IGenericReturn } from './RequestResponseTypes/IGenericReturns';

const GET_METADATA_KEY = 'express:router:get';
const POST_METADATA_KEY = 'express:router:post';
const PUT_METADATA_KEY = 'express:router:put';
const DELETE_METADATA_KEY = 'express:router:delete';
const PATCH_METADATA_KEY = 'express:router:patch';

interface RouteInterface {
    path: string;
    callback: (req: RequestData, paramMap: Map<string, any>) => IGenericReturn;
    description?: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

type expressRequest = {
    app: Express;
    baseUrl: string;
    body?: any;
    cookies?: any;
    ip?: string;
    ips?: string[];
    hostname?: string;
    query?: any;
    signedCookies?: any;
    params?: any;
    originalUrl?: string;
    secure?: boolean;
    fresh?: boolean;
    method?: string;
    path?: string;
    protocol?: string;
    route?: any;
    stale?: boolean;
    subdomains?: string[];
    xhr?: boolean;
    accepts: (types: string[]) => string;
    acceptsCharsets: (charsets: string[]) => string;
    acceptsEncodings: (encodings: string[]) => string;
    acceptsLanguages: (languages: string[]) => string;
    get: (header: string) => string;
    is: (types: string[]) => string;
    param: (name: string, defaultValue?: any) => any;
    range: (size: number, options?: any) => any;
};

type expressResponse = {
    app: Express;
    headersSent: boolean;
    locals: any;
    append: (field: string, value: string) => void;
    attachment: (filename?: string) => void;
    cookie: (name: string, value: string, options?: any) => void;
    clearCookie: (name: string, options?: any) => void;
    download: (path: string, filename?: string, callback?: Function) => void;
    end: (data?: any, encoding?: string) => void;
    format: (obj: any) => void;
    get: (field: string) => string;
    json: (body?: any) => void;
    jsonp: (body?: any) => void;
    links: (links: any) => void;
    location: (path: string) => void;
    redirect: (status: number, path: string) => void;
    render: (view: string, options?: any, callback?: Function) => void;
    send: (body?: any) => Response;
    sendFile: (path: string, options?: any, callback?: Function) => void;
    sendStatus: (status: number) => void;
    set: (field: string, value: string) => void;
    status: (code: number) => expressResponse;
    type: (type: string) => void;
    vary: (field: string) => void;
};

type RequestData = {
    baseUrl: string;
    body?: any;
    cookies?: any;
    ip?: string;
    ips?: string[];
    hostname?: string;
    query?: any;
    signedCookies?: any;
    params?: any;
    originalUrl?: string;
    secure?: boolean;
};

type RouteType = {
    method: string;
    path: string;
    description: string;
};

/**
 * @class ExpressServer
 * @description Classe responsável por iniciar o servidor express
 * @example const server = new ExpressServer(8080);
 * server.start();
 * @author Ruan Fernandes
 */
class RuServer {
    private app: Express;
    private routes: RouteType[];
    private _logger: Logger;
    private _logLevels: LogLevel[] = [LogLevel.ERROR];

    private _paramMap = new Map<string, any>();

    /**
     *
     * @param port Porta que o servidor irá rodar
     */
    constructor(private port: number = 3000, logLevels?: LogLevel[]) {
        this.routes = new Array<RouteType>();
        this._paramMap = new Map<string, any>();
        this._logger = new Logger('RuServer', logLevels || this._logLevels);
        this._paramMap.set('logger', this._logger);

        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    /**
     * @description Retorna o logger da aplicação
     * @returns Logger
     */
    public get logger(): Logger {
        return this._logger;
    }

    /**
     *
     * @description Inicia o servidor na porta definida no construtor
     */
    public start() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ' + this.port);
        });
    }

    private addRoute(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        path: string,
        callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn,
        description: string
    ) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === method;
        });

        if (existingRoute) {
            throw new Error(
                `Route ${method}/${existingRoute.path} already exists.`
            );
        }

        switch (method) {
            case 'GET':
                this.app.get(path, async (req, res) => {
                    const data = await callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                });
                break;
            case 'POST':
                this.app.post(path, async (req, res) => {
                    const data = await callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                });
                break;
            case 'PUT':
                this.app.put(path, async (req, res) => {
                    const data = await callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                });
                break;

            case 'DELETE':
                this.app.delete(path, async (req, res) => {
                    const data = await callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                });
                break;

            case 'PATCH':
                this.app.patch(path, async (req, res) => {
                    const data = await callback(req, this._paramMap);
                    res.status(data.statusCode).send(data.message);
                });
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

    public addParam(key: string, value: any) {
        this._paramMap.set(key, value);
    }

    /**
     *
     *  @description Retorna todas as rotas registradas no servidor
     *  @example server.getRoutes(type: 'GET')
     *
     *
     */
    public getRoutes(type: string) {
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
    getRoutesArray(type: string) {
        const data = this.routes.filter((route) => {
            return route.method === type;
        });

        return data;
    }

    /**
     * @description Funciona igual o getRoutes, porém retorna um array de keys
     */

    getRoutesKeys(type: string, key: 'description' | 'path') {
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
    public loadControllers(apiData: Controlador[]) {
        apiData.forEach((element) => {
            // Get Routes
            const getRoutes = Reflect.getMetadata(GET_METADATA_KEY, element);
            if (getRoutes) {
                getRoutes.forEach((route: RouteInterface) => {
                    this.addRoute(
                        'GET',
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }

            // Post Routes
            const postRoutes = Reflect.getMetadata(POST_METADATA_KEY, element);
            if (postRoutes) {
                postRoutes.forEach((route: RouteInterface) => {
                    this.addRoute(
                        'POST',
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }

            // Put Routes
            const putRoutes = Reflect.getMetadata(PUT_METADATA_KEY, element);
            if (putRoutes) {
                putRoutes.forEach((route: RouteInterface) => {
                    this.addRoute(
                        'PUT',
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }

            // Delete Routes
            const deleteRoutes = Reflect.getMetadata(
                DELETE_METADATA_KEY,
                element
            );
            if (deleteRoutes) {
                deleteRoutes.forEach((route: RouteInterface) => {
                    this.addRoute(
                        'DELETE',
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }

            // Patch Routes
            const patchRoutes = Reflect.getMetadata(
                PATCH_METADATA_KEY,
                element
            );
            if (patchRoutes) {
                patchRoutes.forEach((route: RouteInterface) => {
                    this.addRoute(
                        'PATCH',
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }
        });
    }
}

export function Get(path: string = '', description: string = '') {
    return function (target: any, propertyKey: string) {
        const getRoutes =
            Reflect.getMetadata(GET_METADATA_KEY, target.constructor) || [];

        const callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn = target[propertyKey];

        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'GET',
        };
        Reflect.defineMetadata(
            GET_METADATA_KEY,
            [...getRoutes, route],
            target.constructor
        );

        const metadata =
            Reflect.getMetadata(
                GET_METADATA_KEY,
                target.constructor,
                propertyKey
            ) || [];
        metadata.push({ type: 'GET', path, description });
        Reflect.defineMetadata(
            GET_METADATA_KEY,
            metadata,
            target.constructor,
            propertyKey
        );
    };
}

export function Post(path: string = '', description: string = '') {
    return function (target: any, propertyKey: string) {
        const postRoutes =
            Reflect.getMetadata(POST_METADATA_KEY, target.constructor) || [];

        const callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn = target[propertyKey];

        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'POST',
        };

        Reflect.defineMetadata(
            POST_METADATA_KEY,
            [...postRoutes, route],
            target.constructor
        );

        const metadata =
            Reflect.getMetadata(
                POST_METADATA_KEY,
                target.constructor,
                propertyKey
            ) || [];

        metadata.push({ type: 'POST', path, description });

        Reflect.defineMetadata(
            POST_METADATA_KEY,
            metadata,
            target.constructor,
            propertyKey
        );
    };
}

export function Delete(path: string = '', description: string = '') {
    return function (target: any, propertyKey: string) {
        const deleteRoutes =
            Reflect.getMetadata(DELETE_METADATA_KEY, target.constructor) || [];

        const callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn = target[propertyKey];

        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'DELETE',
        };
        Reflect.defineMetadata(
            DELETE_METADATA_KEY,
            [...deleteRoutes, route],
            target.constructor
        );

        const metadata =
            Reflect.getMetadata(
                DELETE_METADATA_KEY,
                target.constructor,
                propertyKey
            ) || [];
        metadata.push({ type: 'DELETE', path, description });
        Reflect.defineMetadata(
            DELETE_METADATA_KEY,
            metadata,
            target.constructor,
            propertyKey
        );
    };
}

export function Put(path: string = '', description: string = '') {
    return function (target: any, propertyKey: string) {
        const putRoutes =
            Reflect.getMetadata(PUT_METADATA_KEY, target.constructor) || [];

        const callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn = target[propertyKey];

        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'PUT',
        };
        Reflect.defineMetadata(
            PUT_METADATA_KEY,
            [...putRoutes, route],
            target.constructor
        );

        const metadata =
            Reflect.getMetadata(
                PUT_METADATA_KEY,
                target.constructor,
                propertyKey
            ) || [];
        metadata.push({ type: 'PUT', path, description });
        Reflect.defineMetadata(
            PUT_METADATA_KEY,
            metadata,
            target.constructor,
            propertyKey
        );
    };
}

export function Patch(path: string = '', description: string = '') {
    return function (target: any, propertyKey: string) {
        const patchRoutes =
            Reflect.getMetadata(PATCH_METADATA_KEY, target.constructor) || [];

        const callback: (
            req: RequestData,
            paramMap: Map<string, any>
        ) => IGenericReturn = target[propertyKey];

        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: callback,
            description: description,
            method: 'PATCH',
        };
        Reflect.defineMetadata(
            PATCH_METADATA_KEY,
            [...patchRoutes, route],
            target.constructor
        );

        const metadata =
            Reflect.getMetadata(
                PATCH_METADATA_KEY,
                target.constructor,
                propertyKey
            ) || [];
        metadata.push({ type: 'PATCH', path, description });
        Reflect.defineMetadata(
            PATCH_METADATA_KEY,
            metadata,
            target.constructor,
            propertyKey
        );
    };
}

class Controlador {
    constructor() {}
}

export function Controller() {
    return function (constructor: Function) {
        Object.setPrototypeOf(constructor.prototype, new Controlador());
    };
}

export {
    expressRequest,
    expressResponse,
    RuServer,
    RouteInterface,
    RequestData,
    Logger,
};
