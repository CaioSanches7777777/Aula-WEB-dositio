import {build} from './app.js';

//const options = { logger: true };
//const app = await build({options});

const app = await build({logger: true});

await app.listen({port: 3000});
