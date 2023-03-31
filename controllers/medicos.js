const Medico = require('../models/medico');
const {
    response
} = require('express');
const bcrypt = require('bcryptjs');
const {
    generarJWT
} = require('../helpers/jwt');


const getMedico = async (req, res) => {
    const medico = await Medico.find().populate('usuario','nombre').populate('hospital','nombre');

   

    res.json({
        ok: true,
        medico
    });
}


const crearMedico= async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario :uid,
        ...req.body
    });
    
    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico:medicoDB

        });

    
} catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error hable con el admin'
    });
}

    



}


const actualizarMedico= async (req, res = response) => {
    //Todo Validar token y comprobar si es el usuario correcto


    res.json({
        ok: true,

        msg: 'Actualizado medico'

    });


}

const borrarMedico = async (req, res = response) => {



    res.json({
        ok: true,
        msg: 'Medico elimindado con exito'
    })

}

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}