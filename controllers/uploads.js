const { response } = require("express");
const fs = require('fs')

const {v4: uuidv4} = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');


const fileUpload = (req, res = response) => {
    
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    //Validar que exista un tipo
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital '
        });
    }

    //Validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) { 
        return res.status(404).json({
            ok: false,
            msg:'No hay ningun archivo'
        })
    }

    //procesar de una imagen

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gift'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(404).json({
            ok: false,
            msg: 'El archivo no es soportado'
        });
    }

    //Generar el nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //Mover la image

    file.mv(path, (err) => {
        if (err) {
            
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

     //actualizar la base de datoxs

         actualizarImagen(tipo, id, nombreArchivo);

         res.json({
             ok: true,
             msg:'Archivo subido',

             nombreArchivo
         })
    })

   


   
}

const cargarImagen = ( req, res=response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`)
    
    if (fs.existsSync(pathImg)) {
        
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`)
        res.sendFile(pathImg);
        
    }
      
    
}

module.exports = {
    fileUpload,
    cargarImagen
}