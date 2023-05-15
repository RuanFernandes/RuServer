import { Controller, Get, Post, RequestData, Delete, Put, Patch } from '..';

@Controller()
export class HelloWorld {
    // Can get request data too
    // @Method()
    // func(reqData: RequestData)

    @Get('hello', 'Hello World')
    getTest(reqData: RequestData) {
        if (reqData.query.name) {
            return `Hello ${reqData.query.name}!`;
        }

        return 'Hello!';
    }

    @Get('hello/:name', 'Hello World')
    getTestParams(reqData: RequestData) {
        return `Hello ${reqData.params.name}!`;
    }

    @Post('hello', 'Hello World')
    postTest() {
        return 'Hello Post!';
    }

    @Post('hello/data', 'Hello World')
    postTestData(reqData: RequestData) {
        return `Hello ${reqData.body.name}!`;
    }

    @Delete('hello', 'DELETE Hello World')
    deleteData() {
        return 'Hello Delete!';
    }

    @Put('hello', 'PUT Hello World')
    asdf() {
        return 'Hello Put!';
    }

    @Patch('hello', 'PATCH Hello World')
    patchData() {
        return 'Hello Patch!';
    }
}
