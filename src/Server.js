const Koa = require('koa')
const loggerMiddleware = require('./middleware/logger')
const responseTimeMiddleware = require('./middleware/responseTime')
const logger = require('./logger')
const routeLoader = require('./service/RouteLoader')

class Server {
    constructor(routeDir) {
        this.app = new Koa()
        //TODO: configurable middleware
        this.app
            .use(loggerMiddleware)
            .use(responseTimeMiddleware)

        this.loadRoutes(routeDir)
    }

    addRoute(route) {
        this.app
            .use(route.routes())
            .use(route.allowedMethods())
    }

    loadRoutes(routeDir) {
        routeLoader.loadRoutes(routeDir, this.addRoute.bind(this))
    }

    run() {
        this.app.listen(3000)
        logger.info('Server listening on port 3000')
    }
}

module.exports = Server