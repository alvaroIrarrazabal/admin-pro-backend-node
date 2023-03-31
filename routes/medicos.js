// Ruta /api/medico

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
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos');
const {
    validarJWT
} = require('../middleware/validar-jwt');


const router = Router();


router.get('/',validarJWT, getMedico);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital id debe ser válido').isMongoId(),
        validarCampos


    ], crearMedico

);

router.put('/:id',
    [
    
    ],


    actualizarMedico);

router.delete('/:id', borrarMedico)

module.exports = router;