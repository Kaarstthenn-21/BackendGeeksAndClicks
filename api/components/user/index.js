//exportar los controladores
const store = require('../../../store/dummy');
const ctrl = require('./controller');

module.exports = ctrl(store);
