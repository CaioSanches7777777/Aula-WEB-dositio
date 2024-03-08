import fastify from 'fastify';
import createError from '@fastify/error';
import autoload from '@fastify/autoload';
import jwt from '@fastify/jwt';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { request } from 'http';
import products from './routes/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MyCustomError = createError('MyCustomError', 'Something strange happened', 501); //mensagem de erro customisada
const InvalidProductError = createError('InvalidProductError', 'Invalid Product', 401);

export async function build(opts){
    const app = fastify(opts);

    await app.register(jwt,{
        secret: opts.jwt_secret
    });


    await app.register(autoload,{
        dir: join(__dirname, 'hooks'),
        encapsulate: false
    });
    await app.register(autoload, {
        dir: join(__dirname, 'routes')
    });



    app.get('/error', (request, reply) => {
        throw new MyCustomError();
    });

    app.setErrorHandler(async (error, request, reply) => {
        const {validation} = error;
        request.log.error({ error });
        reply.code(error.statusCode || 500);

        return validation ? `Validation Error: ${validation[0].message}.` : 'Internal Server Error';
    });

    app.get('/notfound', (request, reply) => {
        request.log.info('Sending to not found handler');
        reply.callNotFound();
    })

    app.setNotFoundHandler(async (request, reply) => {
        reply.code(404);

        return `Resource not found.`;
    });

    return app;
}
