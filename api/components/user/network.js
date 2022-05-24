const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const controller = require("./index");

const router = express.Router();

router.get("/", list);
router.post("/follow/:id", secure("follow"), follow);
router.post("/like/:id", secure("like"), like);
router.get('/:id/followers', secure('follow'), followers);
router.get('/:id/likes', secure('like'), likes);
router.get("/:id", get);
router.post("/", upsert);
router.put("/", secure("update"), upsert);
router.get('/usuario/username/', getUserName);

// Internal Functions
function list(req, res, next) {
  controller
    .list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  controller
    .upsert(req.body , req.files?.image)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}

// function delete(req,res){
//     controller.remove(req.params.id)
//     .then(() => {
//         response.success(req, res, 'Usuario eliminado correctamente', 200);
//     }).catch(error => {
//         response.error(req, res, error, 500);
//     });
// }

function follow(req, res, next) {
  console.log(req.user.id);
  controller
    .follow(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function like(req, res, next) {
  controller
    .like(req.user.id, req.params.id)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch(next);
}

function followers (req, res, next) {
  controller.following(req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function likes (req, res, next) {
  controller.likes(req.params.id)
    .then((data) => {
      response.success(req, res, data, 201)
    })
    .catch(next)
}

function getUserName(req, res, next) {
  controller.getUserName(req.query.usuario)
      .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

module.exports = router;
