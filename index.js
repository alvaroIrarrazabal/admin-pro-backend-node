require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config')


//crear servidorde express

const app = express();

// Configurar Cors

app.use(cors());

//Lectura y parseo del body

app.use(express.json());

//BDdatos
dbConnection();

console.log(process.env.PORT);

//user irarrazabalalvaro
// pass X7i67CZVLBNbrKBa
//

// //Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));



app.listen(process.env.PORT, (req, res) => {
    console.log('servidor corriendo en el puerto ' + process.env.PORT);
});