// Ruta /api/hospitales

const {
    check
} = require('express-validator');
const {
    validarCampos
} = require('../middleware/validar-campos')
const {
    Router
} = require('express');
const {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitalse');
const {
    validarJWT
} = require('../middleware/validar-jwt');


const router = Router();


router.get('/', validarJWT, getHospital);

router.post('/', [
    validarJWT,
    check('nombre', 'el nombre del Hospital es obligatorio ').not().isEmpty(),
    validarCampos
], crearHospital
);

router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre del Hospital es obligatorio ').not().isEmpty(),
        validarCampos


], actualizarHospital);

router.delete('/:id', borrarHospital)

module.exports = router;