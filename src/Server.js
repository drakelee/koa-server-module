const Koa = require('koa')
const {ApolloServer} = require('apollo-server-koa')
const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const loggerMiddleware = require('./middleware/logger')
const responseTimeMiddleware = require('./middleware/responseTime')
const logger = require('./logger')
const schemaLoader = require('./service/SchemaLoader')

class Server {
    constructor(schemaDir) {
        this.schemas = []
        this.loadSchemas(schemaDir)

        const schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: 'Query',
                fields: () => ({
                    ...this.schemas
                })
            })
        })

        const server = new ApolloServer({schema})

        this.app = new Koa()
        //TODO: configurable middleware
        this.app
            .use(loggerMiddleware)
            .use(responseTimeMiddleware)
        server.applyMiddleware({app: this.app})
    }

    addSchema(schema) {
        this.schemas = {...this.schemas, ...schema}
    }

    loadSchemas(schemaDir) {
        schemaLoader.loadSchemas(schemaDir, this.addSchema.bind(this))
    }

    run() {
        this.app.listen(3000)
        logger.info('Server listening on port 3000')
    }
}

module.exports = Server