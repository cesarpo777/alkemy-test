
const Usuario = require('../models/Usuario')

        
const getUsuarios = async( req, res ) => {

    try {
        const usuarios = await Usuario.findAll()
    
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


}

const deleteUsuario = async( req, res ) => {



}

module.exports = {
    getUsuarios,
    getUsuarioxId,
    updateUsuario,
    deleteUsuario
}