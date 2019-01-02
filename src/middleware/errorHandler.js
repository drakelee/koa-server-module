const logger = require('../logger')

module.exports = (err, ctx) => {
    logger.error('server error', err, ctx)
}