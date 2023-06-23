import {
    Controller,
    Get,
    RequestData,
    RuServer,
    Logger,
    Post,
    Ok,
    BadRequest,
} from 'ruserver';
import { LogLevel } from 'ruserver/dist/logger';

const server = new RuServer(3000, [
    LogLevel.ERROR,
    LogLevel.DEBUG,
    LogLevel.INFO,
]);

@Controller()
class TestController {
    constructor() {
        console.log('TestController created');
    }

    // Sem parametros, o método é chamado para o caminho "/"
    @Get()
    index(requestData: RequestData, paramMap: Map<string, any>) {
        // requestData e logger são injetados automaticamente
        // Não é necessário declarar os parâmetros, somente se precisar usa-los
        const logger = paramMap.get('logger') as Logger;
        logger.info('TestController.index() called');

        // requestData.query é um objeto com os parâmetros da query string
        if (requestData.query.name) {
            return new Ok(`Hello ${requestData.query.name}!`);
        }

        return new BadRequest('Hello World!');
    }

    @Get('test/:id')
    test(requestData: RequestData) {
        // requestData.params é um objeto com os parâmetros da URL
        return new Ok(`Test ${requestData.params.id}`);
    }

    @Post()
    post(requestData: RequestData) {
        if (!requestData.body.name) {
            return new BadRequest('Name is required');
        }

        // requestData.body é um objeto com os parâmetros do corpo da requisição
        return new Ok(`Post ${requestData.body.name}`);
    }
}

server.loadControllers([TestController]);

server.start();
