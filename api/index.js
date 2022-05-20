// servidor
const express = require("express");
const bodyParser = require("body-parser");
const config = require("../config.js");

const app = express();
const user = require("./components/user/network");
const auth = require("./components/auth/network");
const post = require('./components/post/network');
const errors = require("../network/errors");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require('./swagger.json')

const swaggerDocs=swaggerJsDoc (swaggerDoc);


app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//Router
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use('/api/post', post);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(errors);
app.listen(config.api.port, () => {
  console.log("Api escuchando en el puerto", config.api.port);
});
