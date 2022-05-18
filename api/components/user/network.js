const express = require('express');
const secure = require('./secure')
const response = require('../../../network/response');
const controller = require('./index');


const router = express.Router();


router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal Functions
function list(req, res, next) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch(next);
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        }).catch(next);
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        }).catch(next);
}

// function delete(req,res){
//     controller.remove(req.params.id)
//     .then(() => {
//         response.success(req, res, 'Usuario eliminado correctamente', 200);
//     }).catch(error => {
//         response.error(req, res, error, 500);
//     });
// }


module.exports = router;