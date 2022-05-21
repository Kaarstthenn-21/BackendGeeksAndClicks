const TABLA = 'post';
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

        const post = {
            id: '',
            text: body.text,
            user: body.user,
            titulo: body.titulo,
            tipo: body.tipo,
            imagen: 'https://res.cloudinary.com/riacrdo2/image/upload/v1653087112/default/informaticaDefault_uxbsle.jpg',
            video: body.video,
            categoria: body.categoria
        }
        var isnuevo;
        if (body.id) {
            post.id = body.id;
            isnuevo = false;
        }else{
            post.id = nanoid();
            isnuevo = true;
        }

        if (body.imagen) {
            post.imagen = body.imagen;
        }
        return store.upsert(TABLA, post, isnuevo);
    }

    function getCampoCategoria(categoria) {
        return injectedStore.getcampo(TABLA, categoria, 'categoria');
    }

    function getCampoTipo(tipo) {
        return injectedStore.getcampo(TABLA, tipo, 'tipo');
    }

    function getTipoCategoria(tipo,categoria) {
        return injectedStore.getTipoCategoria(TABLA, tipo, categoria);
    }

    return {
        list,
        upsert,
        getCampoCategoria,
        getCampoTipo,
        getTipoCategoria
    };
}