

// '/api/login',

const { response } = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcryptjs')
const {genrarJWT, generarJWT} = require('../helpers/jwt')




const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // verificar contraseña usuario

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) { 
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })

        }
    // generar token -jwt
        
        const token = await generarJWT(usuarioDB.id)

        res.json({
            ok: true,
            token
        })
   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error: hable con el administrador'
        })
    }

}




module.exports = {
    login
}
