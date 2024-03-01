/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';

export default async function products(app, options){

    const InvalidProductError = createError('InvalidProductError', 'Invalid Product', 401);

    const products = [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50},
        {id: 3, name: 'Cenoura', qtd: 30}
    ]

    app.get('/products', async (request, reply) => {
        return products;
    });

    app.post('/products', {
        schema:{
            body:{
                type: 'object',
                properties:{
                    id:{type: 'integer'},
                    name:{type: 'string'},
                    qut:{type: 'integer'}
                },
                required: ['name', 'qtd']
            }
        }
    }, async (request, reply) => {
        let product = request.body;
        if(product.name && product.qtd){
            request.log.info(`Including product ${product.name}.`);
            //db.save(product); //garanta que o produto tenha nome e qtd
            return {product};
        }else{
            throw new InvalidProductError();
        }

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
