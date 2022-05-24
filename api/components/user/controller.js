//acceso a almacenamiento de datos
const { is } = require('express/lib/request');
const { nanoid } = require('nanoid');
const { uploadImage } = require('../../../utils/cloudinary');
const auth = require('../auth/');
const fse = require('fs-extra');
const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return injectedStore.list(TABLA);
    }

    function getUserName(username) {
        console.log("sdds");
        return injectedStore.getcampo(TABLA, username, 'username');
    }
    
    function get(id) {
        return injectedStore.get(TABLA, id);
    }

    async function upsert(body,image) {

        const user = {
            id: '',
            name: body.name,
            username: body.username,
            imagen: 'https://res.cloudinary.com/riacrdo2/image/upload/v1653087107/default/user_ztsbhy.png'
        }
        if (image) {
            const result = await uploadImage(image.tempFilePath);
            user.imagen = result.url;
            console.log(result.url);
            await fse.removeSync(image.tempFilePath);
        }
        var isnuevo;
        if (body.id) {
            console.log("se envio el id");
            console.log(body);
            user.id = body.id;
            isnuevo = false;
            console.log(isnuevo);
            //get(TABLA, body.id).then(val => console.log(val));

        }else{
            user.id = nanoid();
            isnuevo = true;
            if (body.password || body.username) {
                await auth.upsert({
                    id: user.id,
                    username: user.username,
                    password: body.password
                })
            }
        }
        //console.log(isnuevo);
        console.log(user);

        return store.upsert(TABLA, user, isnuevo);
    };

    function remove(id) {
        if (!id) {
            throw new Error('Indica un id valido por favor');
        }
        return injectedStore.remove(TABLA, id);
    }

    function follow(from, to) {
        return store.upsert(TABLA + '_follow', {
            user_from: from,
            user_to: to,
        }, true);
    }

    function like(from, to) {
        return store.upsert(TABLA + '_like', {
            post_from: to,
            user_to: from,
        }, true);
    }

    async function following(user){
        const join={}
        join[TABLA]='user_to';//{user:'user_to'}
        const query={user_from:user};
        return await store.query(TABLA+'_follow',query,join);
    }

    async function likes(post){
        const join={}
        join['post']='post_from';//{user:'user_to'}
        const query={post_from:post};
        return await store.query(TABLA+'_like',query,join);
    }



    return { list, get, upsert, remove, follow,following,getUserName,like,likes, };
};