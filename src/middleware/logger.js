const logger = require('../logger')
module.exports = async (ctx, next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')

    if (rt) {
        logger.info(`${ctx.method} ${ctx.url} - ${rt}`)
    }
}
