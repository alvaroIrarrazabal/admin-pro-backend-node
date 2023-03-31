const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');






const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;


  const [usuarios, total] =  await Promise.all([
        Usuario
            .find({}, 'nombre email role google')
            .skip(desde)
            .limit(5),
        Usuario.count()
    ]);

 

    res.json({
        ok: true,
        usuarios,
        total
    });
}



const crearUsuario = async (req, res) => {

    const { email, password, nombre } = req.body;
    


    try {
        const existeEmail = await Usuario.findOne({ email })

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya esta registrdo con otro Usuario'
            })
        }
        const usuario = new Usuario(req.body);

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //Guardar Usuario
        await usuario.save();
        
        // generar token -jwt

        const token = await generarJWT(usuario.id)

         res.json({
             ok: true,
               msg: 'El usuario fue creado con  exito',
             usuario,
             token
         });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error malo: ' + error.message
        })
    }
   
}


const actualizarUsuario = async (req, res = response) => { 
        //Todo Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
   
    
    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe en la base de datos'
            });
        }

        //Actualizaciones
        const { password,google, email,...campos} = req.body;

        if (usuarioDB.email !== email) {
          
            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg:'Ya existe un usuario con es email'
                })
            }
            
        }
        campos.email = email;   

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok: true,
            usuario: usuarioActualizado,
            msg: 'Actualizado'

        });
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg:'Error Inesperado '
        })

    }

}

const borrarUsuario = async (req, res= response) => { 

    
    const uid = req.params.id;


    try {


        const usuarioDB = await Usuario.findById(uid);

         if (!usuarioDB) {
             return res.status(404).json({
               ok: false,
               msg: 'Usuario no existe en la base de datos'
                });
        }   
        
        await Usuario.findByIdAndDelete(uid);


        res.json({
            ok: true,
            msg:'Usuario elimindado con exito'
        })
        
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario
    ,borrarUsuario
}