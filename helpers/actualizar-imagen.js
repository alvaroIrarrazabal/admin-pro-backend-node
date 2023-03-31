const Hospital = require("../models/hospital")
const Medico = require("../models/medico")
const Usuario = require("../models/usuario")
const fs = require('fs')



const actualizarImagen = async(tipo, id, nombreArchivo) => {
    
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }

          const   pathViejo = `./uploads/medicos/${medico.img}`;

            if (fs.existsSync(pathViejo)) {
                //Borrar la imagen si existia

                fs.unlinkSync(pathViejo);
                
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            
            break;
        case 'hospitales':
             const hospital = await Hospital.findById(id);
             if (!hospital) {
                 return false;
             }

           const   pathViejoHospital = `./uploads/hospitales/${hospital.img}`;

             if (fs.existsSync(pathViejoHospital)) {
                 //Borrar la imagen si existia

                 fs.unlinkSync(pathViejoHospital);

             }

             hospital.img = nombreArchivo;
             await hospital.save();
             return true;
            
            break;
        case 'usuarios':
                const usuario = await Usuario.findById(id);
                if (!usuario) {
                    return false;
                }

                const pathViejoUsuario = `./uploads/usuarios/${usuario.img}`;

                if (fs.existsSync(pathViejoUsuario)) {
                    //Borrar la imagen si existia

                    fs.unlinkSync(pathViejoUsuario);

                }

                usuario.img = nombreArchivo;
                await usuario.save();
                return true;
            
            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}