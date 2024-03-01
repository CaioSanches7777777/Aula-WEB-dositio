/** @type{import('fastify').FastifyPluginAsync<>} */

export default async function spa(app, options){
    const products = [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50},
        {id: 3, name: 'Cenoura', qtd: 30}
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
}
