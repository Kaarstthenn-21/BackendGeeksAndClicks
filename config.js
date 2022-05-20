module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'kaarstthenn',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',        
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'root',
        database: process.env.MYSQL_DB || 'GeeksandClicks',
        port: process.env.PORT || '33060',
    }
}