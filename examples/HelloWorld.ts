import { Controller, Get } from '..';

@Controller()
export class HelloWorld {
    @Get('hello', 'Hello World')
    getTest() {
        return 'Hello!';
    }
}
