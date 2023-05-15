## Biblioteca de Express para criar um servidor basico e configurado.

### Sobre
O servidor foi feito em express com a biblioteca RuServer de RuanFernandes.
Ela usa Controllers para facilitar a criação de rotas e ações.

### Como usar
Para usar a biblioteca, basta instalar ela com o comando:
```bash
git clone https://github.com/RuanFernandes/RuServer.git

cd RuServer
npm install

cd ..
```

Depois, basta importar a biblioteca no seu arquivo.ts
```ts
import { RuServer } from 'RuServer';
import { HelloWorld } from './HelloWorld';

const server = new RuServer(3000);

server.loadControllers([HelloWorld]);

server.start();
```

E criar um controller com o nome desejado, no meu caso HelloWorld.ts
```ts
import { Controller, Get } from 'RuServer';

@Controller()
export class HelloWorld {
    @Get('hello', 'Hello World')
    // Não é obrigatorio passar o parametro do Request Data, só se for usar
     getTest(reqData: RequestData) {
        if (reqData.query.name) {
            return `Hello ${reqData.query.name}!`;
        }

        return 'Hello!';
    }

    // GET /hello/{NAME}
    @Get('hello/:name', 'Hello World')
    getTestParams(reqData: RequestData) {
        return `Hello ${reqData.params.name}!`;
    }

    // POSTs com e sem body data
    @Post('hello', 'Hello World')
    postTest() {
        return 'Hello Post!';
    }

    @Post('hello/data', 'Hello World')
    postTestData(reqData: RequestData) {
        return `Hello ${reqData.body.name}!`;
    }

    // PUTs com e sem body data
    @Put('hello', 'Hello World')
    putTest() {
        return 'Hello Put!';
    }

    @Put('hello/data', 'Hello World')
    putTestData(reqData: RequestData) {
        return `Hello ${reqData.body.name}!`;
    }

    // DELETEs com e sem body data
    @Delete('hello', 'Hello World')
    deleteTest() {
        return 'Hello Delete!';
    }

    @Delete('hello/data', 'Hello World')
    deleteTestData(reqData: RequestData) {
        return `Hello ${reqData.body.name}!`;
    }

    // PATCHs com e sem body data
    @Patch('hello', 'Hello World')
    patchTest() {
        return 'Hello Patch!';
    }

    @Patch('hello/data', 'Hello World')
    patchTestData(reqData: RequestData) {
        return `Hello ${reqData.body.name}!`;
    }
}
```

### API
Após tudo feito, basta iniciar as requisições nas rotas criadas.