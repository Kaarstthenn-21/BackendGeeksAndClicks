module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'kaarstthenn',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'sql10.freemysqlhosting.net',        
        user: process.env.MYSQL_USER || 'sql10491487',
        password: process.env.MYSQL_PASS || 'rJN7nGcgFU',
        database: process.env.MYSQL_DB || 'sql10491487',
    }
}