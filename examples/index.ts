import { HelloWorld } from './HelloWorld';
import { RuServer } from '../index';

const server = new RuServer(3000);

server.loadControllers([HelloWorld]);

server.start();
