const mysql = require('mysql2');

const config = require('../config');

const dbconfig = {
    connectionLimit: 10,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
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
            if (err) return reject(error);
            resolve(data);
        });
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
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

async function upsert(table, data) {
    const result = await get(table, data.id);
    if (result.length < 1) {
        return insert(table, data);
    } else {
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

function query(table, query){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, query,(error, result)=>{
            if(error) return reject(error)
            
            if(result == null){
                reject('No existe el usuario');
            }
            // Necesario para evitar el rowdatapacket
            let output = {
                id: result[0].id,
                username: result[0].username,
                password: result[0].password
            }
            
            resolve(output, null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    query
}