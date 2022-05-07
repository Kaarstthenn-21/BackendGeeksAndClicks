// servidor
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config.js');

const app = express();
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.listen(config.api.port, () => {
    console.log('Api escuchando en el puerto', config.api.port)
});