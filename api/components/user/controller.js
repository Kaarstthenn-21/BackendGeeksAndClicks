//acceso a almacenamiento de datos
const { nanoid } = require('nanoid')
const auth = require('../auth/index');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return injectedStore.list(TABLA);
    }
    
    function get(id) {
        return injectedStore.get(TABLA, id);
    }

    async function upsert(body) {

        const user = {
            name: body.name,
            username: body.username,
        }
        if (body.id) {
            user.id = body.id;
        }else{
            user.id = null;
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password
            })
        }

        return store.upsert(TABLA, user);
    };

    function remove(id) {
        if (!id) {
            throw new Error('Indica un id valido por favor');
        }
        return injectedStore.remove(TABLA, id);
    }
    return { list, get, upsert, remove };
};