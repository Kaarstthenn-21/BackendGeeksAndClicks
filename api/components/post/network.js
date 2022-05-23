const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.post("/", upsert);
router.get("/categoria/", getcampo);
router.get("/tipo/", getCampoTipo);
router.get("/tipocategoria/", getTipoCategoria);
router.get("/user/", getCampoUser);
// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    Controller
      .upsert(req.body, req.files?.image)
      .then((data) => {
        response.success(req, res, data, 201);
      })
      .catch(next);
  }

  function getcampo(req, res, next) {
    Controller
        .getCampoCategoria(req.query.categoria)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }

  function getCampoTipo(req, res, next) {
    Controller
        .getCampoTipo(req.query.tipo)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }
  function getTipoCategoria(req, res, next) {
    Controller
        .getTipoCategoria(req.query.tipo, req.query.categoria)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }

  function getCampoUser(req, res, next) {
    Controller
        .getCampoCategoria(req.query.user)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }

module.exports = router;