const TABLA = 'comments';
const { nanoid } = require('nanoid');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function upsert(body) {

        const comments = {
            id: '',
            user_id: body.user_id,
            post_id: body.post_id,
            text: body.titulo
        }
        var isnuevo;
        if (body.id) {
            comments.id = body.id;
            isnuevo = false;
        }else{
            comments.id = nanoid();
            isnuevo = true;
        }
        return store.upsert(TABLA, comments, isnuevo);
    }

    function getcampo(post) {
        return injectedStore.getcampo(TABLA, post, 'post_id');
    }


    

    return {
        list,
        upsert,
        getcampo,
    };
}