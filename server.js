import { build } from './app.js';
import dotenv from 'dotenv';
import closeWithGrace from 'close-with-grace';

dotenv.config();

const options = { logger: true };
const app = await build(options);


const port = process.env.PORT || '3000';
const host = process.env.HOST || '127.0.0.1';

await app.listen({port, host});

closeWithGrace(async ({signal, err}) => {
    if(err) app.log.error(`Server closing due to an error: ${err.message}`);
    else app.log.info(`${signal} signal recived. Shutting down gracefully.`);
})


//setTimeout(() => {
//    throw new Error('Erro no servidor');
//}, 3000);
