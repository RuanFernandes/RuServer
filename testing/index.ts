import { Controller, Get, RuServer } from 'ruserver';

const server = new RuServer();

@Controller()
class TestController {
    constructor() {
        console.log('TestController created');
    }

    @Get('')
    index() {
        return 'Hello world!';
    }
}

server.loadControllers([TestController]);

server.start();
