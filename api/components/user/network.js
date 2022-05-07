const express = require('express');
const secure = require('./secure')
const response = require('../../../network/response');
const controller = require('./index');


const router = express.Router();
router.use(express.json());

router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);

// Internal Functions
function list(req, res) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200)
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function get(req, res) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        }).catch((err) => {
            response.error(req, res, err.message, 500);
        });
}

function upsert(req, res) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        }).catch((error) => {
            response.error(req, res, error, 500);
        });
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