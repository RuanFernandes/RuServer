export declare abstract class IGenericReturn {
    statusCode: number;
    message?: string | {
        [key: string]: any;
    };
    constructor();
}
