import { BadRequest } from './../ruserver/src/RequestResponseTypes/ResponseReturnBadReq';
import { Controller, Get, RequestData, RuServer, Logger, Post } from 'ruserver';

const Ok = () => {
    return 'ok';
};

const server = new RuServer();

@Controller()
class TestController {
    constructor() {
        console.log('TestController created');
    }

    // Sem parametros, o método é chamado para o caminho "/"
    @Get()
    index(requestData: RequestData, logger: Logger) {
        // requestData e logger são injetados automaticamente
        // Não é necessário declarar os parâmetros, somente se precisar usa-los
        logger.info('TestController.index() called');

        if (
            requestData.query == null ||
            requestData.query.name === '' ||
            requestData.query.name === undefined ||
            requestData.query.name === null
        ) {
            return new BadRequest('Name is required');
        }

        // requestData.query é um objeto com os parâmetros da query string
        if (requestData.query.name) {
            return new Ok(`Hello ${requestData.query.name}!`);
        }

        return new Ok('Hello World!');
    }

    // @Get('test/:id')
    // test(requestData: RequestData) {
    //     // requestData.params é um objeto com os parâmetros da URL
    //     return `Test ${requestData.params.id}`;
    // }

    // @Post()
    // post(requestData: RequestData) {
    //     if (!requestData.body.name) {
    //         return `Name is required`;
    //     }

    //     // requestData.body é um objeto com os parâmetros do corpo da requisição
    //     return `Post ${requestData.body.name}`;
    // }
}

server.loadControllers([TestController]);

server.start();
