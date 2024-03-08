/** @type{import('fastify').FastifyPluginAsync<>} */

export default async function onRouteHook(app, options){
    const logMe = async (request, reply) => {
        request.log.info(`Request on route: ${request.url}`);
    };

    app.addHook('onRoute', async (routeOptions) => {
        if(routeOptions.config?.logMe){
            if(!Array.isArray(routeOptions.onRequest) && routeOptions.onRequest){
                routeOptions.onRequest = [routeOptions.onRequest];
            }else{
                routeOptions.onRequest = [];
            }
            routeOptions.onRequest.push(logMe);
        }
    });
}
