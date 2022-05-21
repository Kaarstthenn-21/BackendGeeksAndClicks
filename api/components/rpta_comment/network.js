const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.post('/', upsert);
router.get("/comment/", getcampo);
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
      .upsert(req.body)
      .then((data) => {
        response.success(req, res, data, 201);
      })
      .catch(next);
  }

  function getcampo(req, res, next) {
    Controller
      .getcampo(req.query.comment)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }

module.exports = router;