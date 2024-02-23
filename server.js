import {build} from './app.js';

const options = {logger: true}

const app = await build({options});

await app.listen({port: 3000});