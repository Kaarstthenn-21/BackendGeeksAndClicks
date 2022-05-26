const express = require('express');
const secure = require("./secure");
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.post("/", upsert);
router.put("/", upsert);
router.get("/categoria/", getcampo);
router.get("/tipo/", getCampoTipo);
router.get("/tipocategoria/", getTipoCategoria);
router.get("/user/", getCampoUser);
router.delete('/:id', deletepost);
router.get('/like', secure('logged'), postsLiked)
router.post('/:id/like', secure('add'), like)
router.get('/:id/like', secure('logged'), postLikers)
router.get('/:id/likes', secure('logged'), getCountLike)
router.delete('/:id/like', secure('logged'), deletePostLike)

// functions
function list(req, res, next) {
    Controller.list()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function deletepost(req, res, next) {
  Controller.deletepost(req.params.id)
  .then((data) => {
    response.success(req, res, data, 200);
  })
  .catch(next);
}

function deletePostLike (req, res, next) {
  Controller.deletePostLike(req.user.id, req.params.id)
    .then((user) => {
      response.success(req, res, user, 200)
    })
    .catch(next)
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
        .getCampoUser(req.query.user)
        .then((data) => {
        response.success(req, res, data, 200);
      })
      .catch(next);
  }

  function postsLiked (req, res, next) {
    Controller.postsLiked(req.user.id)
      .then((user) => {
        response.success(req, res, user, 200)
      })
      .catch(next)
  }
  
  function like (req, res, next) {
    Controller.like(req.user.id, req.params.id)
      .then((user) => {
        response.success(req, res, user, 201)
      })
      .catch(next)
  }
  
  function postLikers (req, res, next) {
    Controller.postLikers(req.user.id, req.params.id)
      .then((data) => {
        response.success(req, res, data, 201)
      })
      .catch(next)
  }

  function getCountLike (req, res, next) {
    Controller.getCountLike(req.params.id)
      .then((data) => {
        response.success(req, res, data, 201)
      })
      .catch(next)
  }

module.exports = router;