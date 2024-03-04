/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';

export default async function products(app, options){

    const InvalidProductError = createError('InvalidProductError', 'Invalid Product', 401);

    const products = [
        {id: 1, name: 'Tomate', qtd: 20},
        {id: 2, name: 'Cebola', qtd: 50},
        {id: 3, name: 'Cenoura', qtd: 30}
    ]

    app.get('/products', {config:{logMe: true}}, async (request, reply) => {
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
        
        //db.save(product); //garanta que o produto tenha nome e qtd
        return {product};

    });

    app.get('/products/:id', async (request, reply) => {
        
        return {};
    });
    
    app.delete('/products/:id', async (request, reply) => {
        
        return {};
    });
}
