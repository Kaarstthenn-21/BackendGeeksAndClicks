const mysql = require('mysql2');

const config = require('../config');

const dbconfig = {
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    port: config.mysql.port,
};

//Connection

let connection;

function handleCon() {

    connection = mysql.createPool(dbconfig);

    connection.getConnection((err) => {
        if (err) {
            console.error('[db err]', err);
            setTimeout(handleCon, 2000);
        } else {
            console.log('DB Connected!');
        }
    });

    connection.on('error', err => {
        console.error('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}

handleCon();

function list(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function deleteTable(table, campo, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${campo} = '${id}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function getcampo(table, campo , columna) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ${columna} = '${campo}'`, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function getTipoCategoria(table, tipo, categoria) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE tipo = '${tipo}' AND categoria = '${categoria}' `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function deleteLike(table, condicional1 , condicional2 , valor1, valor2) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE ${condicional1} = '${valor1}' AND ${condicional2} = '${valor2}' `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}



function upsert(table, data, isnuevo){
    //get(table, data.id).then(val => console.log(val));
    console.log("Datos");
    console.log(isnuevo);
    console.log(data);
    if(data && isnuevo){
        return insert(table, data);
    }else{
        return update(table, data);
    }
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}

function getCountLike(table, id) {
    console.log(`SELECT COUNT(*) FROM ${table} WHERE post='${id}'`);
    return new Promise((resolve, reject) => {
        connection.query(`SELECT COUNT(*) FROM ${table} WHERE post='${id}'`, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    })
}

function query(table, query, join) {
    let joinQuery = '';
    if (join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }

    return new Promise((resolve, reject) => {
        console.log(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`);
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err);
            resolve(res[0] || null);
        })
    })
}

const getlike = async (table, where, join = '') => new Promise((resolve, reject) => {
    console.log('table', table)
    console.log('where', where)
    console.log('join', join)
    let joinQuery = ''
    if (join) {
      join.forEach((element, i) => {
        const key = Object.keys(element)[0]
        const val = element[key]
        joinQuery += ` JOIN ${key} ON ${table}.${val} = ${key}.id`
      })
    }
    console.log('table', table)
    console.log('joinQuery', joinQuery)
    console.log('where', where)
  
    connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${'? AND '.repeat(where.length)} 1`, where, (error, data) => {
      if (error) { return reject(error) }
      console.log(data)
      resolve(data)
    })
  })



module.exports = {
    list,
    get,
    upsert,
    query,
    getcampo,
    getTipoCategoria,
    getlike,
    getCountLike,
    deleteLike,
    deleteTable
}