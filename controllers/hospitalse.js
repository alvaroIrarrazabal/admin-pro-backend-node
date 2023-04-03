const Hospital = require('../models/hospital');
const {
    response
} = require('express');
const bcrypt = require('bcryptjs');
const {
    generarJWT
} = require('../helpers/jwt');


const getHospital = async (req, res) => {

    const hospital = await Hospital.find().populate('usuario', 'nombre');

    res.json({
        ok: true,
        hospital
    });
}


const crearHospital = async (req, res) => {
    const uid = req.uid;

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB

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
    const id = req.params.id;
    const idUsuario = req.id;


    try {
       const hospital = await Hospital.findById(id);

        if (!hospital) {
         return res.status(404).json({
                 ok: false,
                
                 msg: 'Hospital no encontrado por id'

             });
        }

        // hospital.nombre = req.body.nombre;

        const cambiosHospital = {
            ...req.body,
            usuario: idUsuario 
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, { new: true });


    res.json({
    ok: true,
        msg: 'Hospital cactualizado',
         hospital:hospitalActualizado

});
       
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',

        })

    }





}

const borrarHospital = async (req, res = response) => {
 const id = req.params.id;


 try {
     const hospital = await Hospital.findById(id);

     if (!hospital) {
         return res.status(404).json({
             ok: false,

             msg: 'Hospital no encontrado por id'

         });
     }

        await Hospital.findByIdAndDelete(id);



     res.json({
         ok: true,
         msg: 'Hospital eliminado',

     });

 } catch (error) {
     console.log(error);
     res.status(500).json({
         ok: false,
         msg: 'Hable con el admin',

     })

 }

}

module.exports = {
    getHospital,
    crearHospital,
    actualizarHospital,
    borrarHospital
}