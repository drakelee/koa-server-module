const Koa = require('koa')
const loggerMiddleware = require('./middleware/logger')
const responseTimeMiddleware = require('./middleware/responseTime')
const logger = require('./logger')

class Server {
    constructor(routes) {
        this.app = new Koa()
        //TODO: configurable middleware
        this.app
            .use(loggerMiddleware)
            .use(responseTimeMiddleware)

        this.loadRoutes(routes)
    }

    loadRoutes(routes) {
        routes.map(route => {
            this.app
                .use(route.routes())
                .use(route.allowedMethods())
        })
    }

    run() {
        this.app.listen(3000)
        logger.info('Server listening on port 3000')
    }
}

module.exports = Server