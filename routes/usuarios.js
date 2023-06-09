// Ruta /api/usuarios

const {  check} = require('express-validator');
const {    validarCampos} = require('../middleware/validar-campos')
const {    Router} = require('express');
const {    getUsuarios, crearUsuario, actualizarUsuario,borrarUsuario} = require('../controllers/usuarios');
const { validarJWT } = require('../middleware/validar-jwt');


 const router = Router();


    router.get('/',validarJWT, getUsuarios);

    router.post('/',
        [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        validarCampos,


    ], crearUsuario

    );

    router.put('/:id',
        [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],


    actualizarUsuario);

    router.delete('/:id', validarJWT, borrarUsuario)

module.exports = router;