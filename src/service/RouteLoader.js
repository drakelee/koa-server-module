const fs = require('fs')

class RouteLoader {

    loadRoutes(routeDir, callback) {
        this.loadRouteDirectory(routeDir, callback)
    }

    loadRouteDirectory(routeDir, callback) {
        const fsDirents = fs.readdirSync(routeDir, {withFileTypes: true})
        fsDirents.map(fsDirent => {
            const fsDirentPath = `${routeDir}/${fsDirent.name}`
            if (fsDirent.isDirectory()) {
                this.loadRouteDirectory(fsDirentPath, callback)
            } else {
                this.loadRoute(fsDirentPath, callback)
            }
        })
    }

    loadRoute(filePath, callback) {
        try {
            const route = require(filePath)
            if (route.constructor.name ===  'Router') {
                callback(route)
            }
        } catch (e) {}
    }
}

module.exports = new RouteLoader()