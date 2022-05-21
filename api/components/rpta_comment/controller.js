const TABLA = 'rpta_comments';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    function upsert(body) {

        const rpta_comments = {
            id: '',
            user_id: body.user_id,
            comment_id: body.comment_id,
            text: body.titulo
        }
        var isnuevo;
        if (body.id) {
            rpta_comments.id = body.id;
            isnuevo = false;
        }else{
            rpta_comments.id = nanoid();
            isnuevo = true;
        }
        return store.upsert(TABLA, rpta_comments, isnuevo);
    }

    function getcampo(comment) {
        return injectedStore.getcampo(TABLA, comment, 'comment_id');
    }


    

    return {
        list,
        upsert,
        getcampo,
    };
}