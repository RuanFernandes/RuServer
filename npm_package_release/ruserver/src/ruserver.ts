import express, { Express, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'reflect-metadata';

const GET_METADATA_KEY = 'express:router:get';
const POST_METADATA_KEY = 'express:router:post';
const PUT_METADATA_KEY = 'express:router:put';
const DELETE_METADATA_KEY = 'express:router:delete';
const PATCH_METADATA_KEY = 'express:router:patch';

interface RouteInterface {
    path: string;
    callback: () => void;
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

    /**
     *
     * @param port Porta que o servidor irá rodar
     */
    constructor(private port: number = 3000) {
        this.routes = new Array<RouteType>();
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
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

    /**
     *
     * @param path Caminho da rota (ex: '/')
     * @param callback Função que será executada quando a rota for acessada
     * @description Adiciona uma rota do tipo GET
     * @documentation https://expressjs.com/pt-br/guide/routing.html
     */
    private addGetRoute(path: string, callback: Function, description: string) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'GET';
        });

        if (existingRoute) {
            throw new Error(`Route GET/${existingRoute.path} already exists.`);
        }

        this.app.get(path, (req, res) => {
            const data = callback(req);
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
    private addPostRoute(
        path: string,
        callback: Function,
        description: string
    ) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'POST';
        });

        if (existingRoute) {
            throw new Error(`Route POST/${existingRoute.path} already exists.`);
        }

        this.app.post(path, (req, res) => {
            const data = callback(req);
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
    private addPutRoute(path: string, callback: Function, description: string) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'PUT';
        });

        if (existingRoute) {
            throw new Error(`Route PUT/${existingRoute.path} already exists.`);
        }

        this.app.put(path, (req, res) => {
            const data = callback(req);
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
    private addDeleteRoute(
        path: string,
        callback: Function,
        description: string
    ) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'DELETE';
        });

        if (existingRoute) {
            throw new Error(
                `Route DELETE/${existingRoute.path} already exists.`
            );
        }

        this.app.delete(path, (req, res) => {
            const data = callback(req);
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
    private addPatchRoute(
        path: string,
        callback: Function,
        description: string
    ) {
        const existingRoute = this.routes.find((route) => {
            return route.path === path && route.method === 'PATCH';
        });

        if (existingRoute) {
            throw new Error(
                `Route PATCH/${existingRoute.path} already exists.`
            );
        }
        this.app.patch(path, (req, res) => {
            const data = callback(req);
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
                    this.addGetRoute(
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
                    this.addPostRoute(
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
                    this.addPutRoute(
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
                    this.addDeleteRoute(
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
                    this.addPatchRoute(
                        route.path,
                        route.callback,
                        route.description || ''
                    );
                });
            }
        });
    }
}

export function Get(path: string, description: string = '') {
    return function (target: any, propertyKey: string) {
        const getRoutes =
            Reflect.getMetadata(GET_METADATA_KEY, target.constructor) || [];
        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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

export function Post(path: string, description: string = '') {
    return function (target: any, propertyKey: string) {
        const postRoutes =
            Reflect.getMetadata(POST_METADATA_KEY, target.constructor) || [];
        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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

export function Delete(path: string, description: string = '') {
    return function (target: any, propertyKey: string) {
        const deleteRoutes =
            Reflect.getMetadata(DELETE_METADATA_KEY, target.constructor) || [];
        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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

export function Put(path: string, description: string = '') {
    return function (target: any, propertyKey: string) {
        const putRoutes =
            Reflect.getMetadata(PUT_METADATA_KEY, target.constructor) || [];
        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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

export function Patch(path: string, description: string = '') {
    return function (target: any, propertyKey: string) {
        const patchRoutes =
            Reflect.getMetadata(PATCH_METADATA_KEY, target.constructor) || [];
        const route: RouteInterface = {
            path: path.charAt(0) !== '/' ? '/' + path : path,
            callback: target[propertyKey],
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
};
