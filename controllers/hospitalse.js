const Hospital = require('../models/hospital');
const {
    response
} = require('express');
const bcrypt = require('bcryptjs');
const {
    generarJWT
} = require('../helpers/jwt');


const getHospital = async (req, res) => {

    const hospital = await Hospital.find().populate('usuario','nombre');

    res.json({
        ok: true,
        hospital
    });
}


const crearHospital = async (req, res) => {
    const uid = req.uid;

    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });
    

    try {
         
      const hospitalDB = await hospital.save();

         res.json({
             ok: true,
             hospital:hospitalDB

         });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

      

   

}


const actualizarHospital = async (req, res = response) => {
    //Todo Validar token y comprobar si es el usuario correcto
    

        res.json({
            ok: true,
            
            msg: 'Actualizado hospital'

        });


   

}

const borrarHospital = async (req, res = response) => {



        res.json({
            ok: true,
            msg: 'Hospital elimindado con exito'
        })

}

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}