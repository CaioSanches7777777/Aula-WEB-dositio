import fastify from 'fastify';
import createError from '@fastify/error';
import fastifyStatic from '@fastify/static';
import spa from './routes/spa.js';
import movies from './routes/movies.js';
import products from './routes/products.js'


const MyCustomError = createError('MyCustomError', 'Something strange happened', 501); //mensagem de erro customisada

export async function build(opts){
    const app = fastify(opts);

    app.register(fastifyStatic, {
        root: `${import.meta.dirname}/public`,
        wildcard: false
    });

    app.register(spa);
    app.register(movies);
    app.register(products);
    

    app.get('/error', (request, reply) => {
        throw new MyCustomError();
    });

    app.setErrorHandler(async (error, request, reply) => {
        request.log.error({ error });
        reply.code(error.statusCode || 500);

        return `Route ${request.url} causes an Internal Server Error.`;
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
