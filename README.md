## Biblioteca de Express para criar um servidor basico e configurado.

## Importante
Esta biblioteca está em desenvolvimento, então pode conter bugs e não está completa.
Baixe sempre a ultima versão, pois ela pode conter correções de bugs e novas funcionalidades.
E fique de olho no README, pois ele pode conter informações importantes.

### Sobre
Biblioteca RuServer de Ruan Fernandes.
Feita em cima do Express, ela facilita a criação de um servidor basico e configurado com controladores.
Ela usa Controllers para facilitar a criação de rotas e ações.

REPOSITÓRIO:
- [GitHub](https://github.com/RuanFernandes/RuServer)

DOAÇÕES:
- [PayPal](https://www.paypal.com/donate/?hosted_button_id=SLNNKWBQCRSBE)

### Como usar
Para usar a biblioteca, basta instalar ela com o comando:
```bash
npm i ruserver
```

Depois, basta importar a biblioteca no seu arquivo.ts
```ts
import { RuServer } from 'ruserver';
import { HelloWorld } from './HelloWorld';

const server = new RuServer(3000); // Porta do servidor (Opcional)
server.loadControllers([HelloWorld]);
server.start();
```

E criar um controller com o nome desejado, no meu caso HelloWorld.ts
```ts
// # Path: HelloWorld.ts
import { Controller, Get, Post, RequestData, Logger } from 'ruserver';
@Controller()
export class HelloWorld {
   
    constructor() {
        console.log('TestController created');
    }

    // Sem primeiro parametro, o método é chamado para o caminho "/"
    @Get('', 'Descricao do metodo')
    index(requestData: RequestData, logger: Logger) {
        // requestData e logger são injetados automaticamente
        // Não é necessário declarar os parâmetros, somente se precisar usa-los
        logger.info('TestController.index() called');

        // requestData.query é um objeto com os parâmetros da query string
        if (requestData.query.name) {
            return `Hello ${requestData.query.name}!`;
        }

        return 'Hello world!';
    }

    @Get('test/:id')
    test(requestData: RequestData) {
        // requestData.params é um objeto com os parâmetros da URL
        return `Test ${requestData.params.id}`;
    }

    @Post()
    post(requestData: RequestData) {
        if (!requestData.body.name) {
            return `Name is required`;
        }

        // requestData.body é um objeto com os parâmetros do corpo da requisição
        return `Post ${requestData.body.name}`;
    }
}
```

### API
Após tudo feito, basta iniciar as requisições nas rotas criadas.

## TODO
- [x] Criar biblioteca
- [x] Criar documentação
- [x] Criar exemplos
- [ ] Criar função para modificar o status code da resposta
- [ ] Criar função para modificar o cabeçalho da resposta
- [ ] Criar função para modificar o corpo da resposta
- [ ] Criar função para autenticar o usuário
- [ ] Criar funções para implementar uma ORM (Prisma)

## Exemplos
- [x] Criar um servidor basico
- [x] Criar um servidor com controladores
- [ ] Criar um servidor com autenticação
- [ ] Criar um servidor com banco de dados
