import { Express, Response } from 'express';
import 'reflect-metadata';
import Logger from './logger';
import { IGenericReturn } from './RequestResponseTypes/IGenericReturns';
interface RouteInterface {
    path: string;
    callback: () => IGenericReturn;
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
declare class RuServer {
    private port;
    private app;
    private routes;
    private _logger;
    /**
     *
     * @param port Porta que o servidor irá rodar
     */
    constructor(port?: number);
    /**
     * @description Retorna o logger da aplicação
     * @returns Logger
     */
    get logger(): Logger;
    /**
     *
     * @description Inicia o servidor na porta definida no construtor
     */
    start(): void;
    private addRoute;
    /**
     *
     *  @description Retorna todas as rotas registradas no servidor
     *  @example server.getRoutes(type: 'GET')
     *
     *
     */
    getRoutes(type: string): string;
    /**
     * @description Funciona igual o getRoutes, porém retorna um array de objetos
     */
    getRoutesArray(type: string): RouteType[];
    /**
     * @description Funciona igual o getRoutes, porém retorna um array de keys
     */
    getRoutesKeys(type: string, key: 'description' | 'path'): string[];
    /**
     * @description Carrega as rotas do servidor por modulos
     */
    loadControllers(apiData: Controlador[]): void;
}
export declare function Get(path?: string, description?: string): (target: any, propertyKey: string) => void;
export declare function Post(path?: string, description?: string): (target: any, propertyKey: string) => void;
export declare function Delete(path?: string, description?: string): (target: any, propertyKey: string) => void;
export declare function Put(path?: string, description?: string): (target: any, propertyKey: string) => void;
export declare function Patch(path?: string, description?: string): (target: any, propertyKey: string) => void;
declare class Controlador {
    constructor();
}
export declare function Controller(): (constructor: Function) => void;
export { expressRequest, expressResponse, RuServer, RouteInterface, RequestData, Logger, };
