const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario');

const validarJWT = async ( req, res, next ) =>{

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try{

        const { uid } = jwt.verify( token , process.env.PRIVATE_KEY);

        const usuario = await Usuario.findByPk( uid )

        if( !usuario ){
            return res.status(401).json({
                msg: 'No existe usuario en DB - estado: false'
            })
        }

       /*  if( !usuario.estado ){
            return res.status(401).json({
                msg: 'No puedes realizar esta acción - estado: false'
            })
        } */

        req.usuario = usuario 

        next()

    }catch( error ){
        console.log( error )
        return res.status(401).json({
            msg: 'token no valido'
        })
        
    }


}


module.exports = {
    validarJWT
}