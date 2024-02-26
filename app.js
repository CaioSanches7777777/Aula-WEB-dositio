import fastify from 'fastify';

export async function build(opts){
    const app = fastify(opts);

    app.get('/error', (request, reply) => {
        throw new Error('Erro no servidor');
    });

    app.get('/', async (request, reply) => {
        return { hello: 'world' }
    });

    const products = [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50}
    ]

    app.get('/products', async (request, reply) => {
        return products;
    });

    app.post('/products', async (request, reply) => {
        let product = request.body;
        return {product};
    });

    app.get('/products/:id', async (request, reply) => {
        app.log.info('Produto requisitado> ' + request.params.id);
        return {};
    });
    
    app.delete('/products/:id', async (request, reply) => {
        app.log.info('Produto para remover> ' + request.params.id);
        return {};
    });

    app.setErrorHandler(async (error, request, reply) => {
        request.log.error({ error });
        reply.code(error.statusCode || 500);

        return `Route ${request.url} causes an Internal Server Error.`;
    });

    return app;
}
