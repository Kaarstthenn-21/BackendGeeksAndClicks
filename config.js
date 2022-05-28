require('dotenv').config();
module.exports = {
    api: {
        port: process.env.HTTPS_PORT,
        ip: process.env.ip,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'kaarstthenn',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'geeks123',
        database: process.env.MYSQL_DB || 'geeks'
    },
    cloudinary: {
        cloud_name: 'riacrdo2',
        api_key: '724884842686881',
        api_secret: 'z7jsFVMQbrmnjiAArtsJ_XJoY_I',
        secure: true
    },
    certificates: {
        KEY_PATH: process.env.KEY_PATH,
        CERT_PATH: process.env.CERT_PATH,
    }
}