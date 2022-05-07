const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const users = require('./api/components/user/network');

//Extended: https://swagger.io/specifications

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Geeks and clicks API Information',
            contact: {
                name: "Linkedin: alexander-ancco-escobar"
            },
            servers: ["https://localhost:3000"]
        }
    },
    // *************[ Rutas ]****************
    apis: ["./api/components/user/network"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;