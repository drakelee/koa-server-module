const fs = require('fs')

class SchemaLoader {

    loadSchemas(schemaDir, callback) {
        this.loadSchemaDirectory(schemaDir, callback)
    }

    loadSchemaDirectory(schemaDir, callback) {
        const fsDirents = fs.readdirSync(schemaDir, {withFileTypes: true})
        fsDirents.map(fsDirent => {
            const fsDirentPath = `${schemaDir}/${fsDirent.name}`
            if (fsDirent.isDirectory()) {
                this.loadSchemaDirectory(fsDirentPath, callback)
            } else {
                this.loadSchema(fsDirentPath, callback)
            }
        })
    }

    loadSchema(filePath, callback) {
        try {
            const schema = require(filePath)
            if (Object.values(schema)[0].type) {
                callback(schema)
            }
        } catch (e) {console.log(e)}
    }
}

module.exports = new SchemaLoader()