const TABLA = 'post';
const { nanoid } = require('nanoid');
const fse = require('fs-extra');
const { uploadImage } = require('../../../utils/cloudinary');

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    async function upsert(body, image) {

        const post = {
            id: '',
            text: body.text,
            user: body.user,
            titulo: body.titulo,
            tipo: 1,
            imagen: 'https://res.cloudinary.com/riacrdo2/image/upload/v1653087112/default/informaticaDefault_uxbsle.jpg',
            categoria: body.categoria,
            video: ''
        }
        var isnuevo;
        if (body.id) {
            post.id = body.id;
            isnuevo = false;
        }else{
            post.id = nanoid();
            isnuevo = true;
        }

        if(body.video){
            post.video = body.video;
        }

        if (image) {
            const result = await uploadImage(image.tempFilePath);
            post.imagen = result.url;
            console.log(result.url);
            await fse.removeSync(image.tempFilePath);
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

    function getCampoUser(user) {
        return injectedStore.getcampo(TABLA, user , 'user')
    }

    return {
        list,
        upsert,
        getCampoCategoria,
        getCampoTipo,
        getTipoCategoria,
        getCampoUser
    };
}