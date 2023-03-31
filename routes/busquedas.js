
const {  Router} = require('express');
const {
    getBusqueda,
    getDocumentosColeccion
} = require('../controllers/busquedas');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/:busqueda',validarJWT, getBusqueda);
router.get('/coleccion/:tabla/:busqueda', getDocumentosColeccion);


module.exports = router;