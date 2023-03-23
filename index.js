require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')


//crear servidorde express

const app = express();

// Configurar Cors

app.use(cors());

//BDdatos
dbConnection();

console.log(process.env.PORT);

//user irarrazabalalvaro
// pass X7i67CZVLBNbrKBa
//

app.get('/', (req, res) => { 
    res.json({
        ok: true,
        msg: 'hola mundo'
    });
});

app.listen(process.env.PORT, (req, res) => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
});