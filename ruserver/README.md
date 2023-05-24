## Biblioteca de Express para criar um servidor basico e configurado.

### Sobre
O servidor foi feito em express com a biblioteca RuServer de RuanFernandes.
Ela usa Controllers para facilitar a criação de rotas e ações.

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
import { Controller, Get } from 'ruserver';
@Controller()
export class HelloWorld {
    @Get('hello', 'Hello World')
    getTest() {
        return 'Hello!';
    }
}
```

### API
Após tudo feito, basta iniciar as requisições nas rotas criadas.