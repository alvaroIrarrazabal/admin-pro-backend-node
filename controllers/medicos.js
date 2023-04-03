const Medico = require('../models/medico');
const {
    response
} = require('express');
const bcrypt = require('bcryptjs');
const {
    generarJWT
} = require('../helpers/jwt');


const getMedico = async (req, res) => {
    const medico = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');



    res.json({
        ok: true,
        medico
    });
}


const crearMedico = async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }





}


const actualizarMedico = async (req, res = response) => {
    //Todo Validar token y comprobar si es el usuario correcto

   const id = req.params.id;
   const idUsuario = req.id;


   try {
       const medico = await Medico.findById(id);

       if (!medico) {
           return res.status(404).json({
               ok: false,

               msg: 'Medico no encontrado por id'

           });
       }

       // hospital.nombre = req.body.nombre;

       const cambiosMedico = {
           ...req.body,
           usuario: idUsuario
       }
       const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {
           new: true
       });


       res.json({
           ok: true,
           msg: 'Medico cactualizado',
           medico: medicoActualizado

       });

   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok: false,
           msg: 'Hable con el admin',

       })

   }




}

const borrarMedico = async (req, res = response) => {


 const id = req.params.id;



 try {
     const medico = await Medico.findById(id);

     if (!medico) {
         return res.status(404).json({
             ok: false,

             msg: 'Medico no encontrado por id'

         });
     }

    
     await Medico.findByIdAndDelete(id);


     res.json({
         ok: true,
         msg: 'Medico eliminado',
       

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
    getMedico,
    crearMedico,
    actualizarMedico,
    borrarMedico
}