const bcryptjs = require('bcryptjs');
const { Op } = require("sequelize");
const Usuario = require('../models/Usuario')

        
const getUsuarios = async( req, res ) => {

    try {
        const usuarios = await Usuario.findAndCountAll({ where: { activo: true }})
    
        res.status(200).json({
            usuarios
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error comunicarse con el adm'
        })
    }   

}

const getUsuarioxId = async( req, res ) => {

    const { id } = req.params;

    try {
        const user = await Usuario.findByPk( id )
        if(!user){
            res.status(400).json({
                msg: `No existe un usuario con el id: ${ id }`
            })
        }
    
        res.status(200).json({
            user
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error , comunicarse con el adm'
        })
    }

}

const updateUsuario = async( req, res ) => {

    const { id } = req.params;
    let numberId = Number(id)
    // VERIFICAR QUE QUIEN ESTA MODIFICANDO EL USUARIO SEA EL MISMO USUARIO
    console.log( typeof numberId )
    console.log( typeof req.usuario.id )
    if( numberId !== req.usuario.id ){
        return res.status(201).json({
            msg:'No tienes los privilegios para realizar esta acción'
        })
    }
    
    // ENCRIPATR CONTRASEÑA
    const { password, ...resto } = req.body;

    const salt = bcryptjs.genSaltSync();
    resto.password =  bcryptjs.hashSync( password, salt )



    try {
        // SI DESEA CAMBIAR EL CORREO HAY QUE VERIFICAR QUE NO EXISTA UNO YA EN LA BD
        const existeCorreo = await Usuario.findAll({ where:{ id:{ [ Op.ne ]: id }, correo: resto.correo }})
        console.log( existeCorreo )
        if( existeCorreo.length === 1){
            return res.status(400).json({
                msg:`El correo ${ resto.correo } no está disponible`
            })
        }
        const usuario = await Usuario.update(resto, { where: { id }})
        const usuarioActualizado = await Usuario.findOne({ where: { id }})
    
        res.status(200).json({
            msg: 'El usuario ha sido actualizado',
            registros_afectados: usuario,
            usuarioActualizado
        })
    } catch (error) {
        console.log( error )
        return res.status( 500 ).json({
            msg: 'Error, comunicarse con el adm'
        })
    }
}

const deleteUsuario = async( req, res ) => {

    const { id } = req.params;
    let numberId = Number(id)
    // VERIFICAR QUE QUIEN ESTA MODIFICANDO EL USUARIO SEA EL MISMO USUARIO
    
    if( numberId !== req.usuario.id ){
        return res.status(201).json({
            msg:'No tienes los privilegios para realizar esta acción'
        })
    }

    try {
        const usuarioBorrado = await Usuario.update({ activo: false }, { where: { id }})
        const usuarioActualizado = await Usuario.findByPk(id)
        
        res.status(200).json({
            msg: 'El usuario ha sido eliminado activo - false',
            registros_afectados : usuarioBorrado,
            usuarioActualizado
        })
    }catch(error){
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error comunicarse con adm'
        })
    }

}

module.exports = {
    getUsuarios,
    getUsuarioxId,
    updateUsuario,
    deleteUsuario
}