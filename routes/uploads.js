const { Router } = require('express');
const { fileUpload} = require('../controllers/uploads');
const { validarJWT } = require('../middleware/validar-jwt');
const expressFileUpload = require('express-fileupload');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);



module.exports = router;