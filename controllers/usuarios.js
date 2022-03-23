
const Usuario = require('../models/Usuario')

        
const getUsuarios = async( req, res ) => {

    const usuarios = await Usuario.findAll()

    res.status(200).json({
        usuarios
    })

}

const getUsuarioxId = async( req, res ) => {

    const { id } = req.params;

    const user = await Usuario.findByPk( id )
    if(!user){
        res.status(400).json({
            msg: `No existe un usuario con el id: ${ id }`
        })
    }

    res.status(200).json({
        user
    })

}

const updateUsuario = async( req, res ) => {


}

const deleteUsuario = async( req, res ) => {


}

module.exports = {
    getUsuarios,
    getUsuarioxId,
    updateUsuario,
    deleteUsuario
}