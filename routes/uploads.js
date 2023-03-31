const { Router } = require('express');
const { fileUpload,cargarImagen} = require('../controllers/uploads');
const { validarJWT } = require('../middleware/validar-jwt');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get('/:tipo/:foto', cargarImagen);


module.exports = router;