import fastify from 'fastify';

export async function build(opts){
    const app = fastify(opts);

    app.get('/', async (request, reply) => {
        return {hello: 'world'}
    });

    const products = [
        {id:1, name: 'Tomate', qtd: 20},
        {id:2, name: 'Cebola', qtd: 50}
    ]

    app.get('/products', async (request, reply) => {
        return products;
    })
    
    app.get('/products/:id', async (request, reply) => {
        app.logger.info('Produto requisitado' + request.params.id);
        return{};
    })

    return app;
};
