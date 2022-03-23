const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/Usuario')


const login = async( req, res ) => {

   const { correo, password } = req.body;

   try {

    // Verificar si existe un usuario con el correo
    const usuario = await Usuario.findOne({ where: { correo: correo }})
    if( !usuario ){
        return res.status(400).json({
            msg: `No existe un usuario con el correo: ${ correo }`
        })
    }

    // Validar contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password )
    if( !validPassword ){
        return res.status(400).json({
            msg: `Correo o contraseña invalidos`
        })
    }

    // Generar token 
    const token = await generarJWT( usuario.id )

    res.status(200).json({
        msg:'login exitoso',
        usuario,
        token
    })

   } catch (error){
        console.log( error )
        return res.status(500).json({
            msg:'Comunicarse con el adm'
        })
   }


}

const register = async( req, res ) => {

   const { password } = req.body;
   
   try {

       const user = new Usuario( req.body )
       // Encriptar contraseña
       const salt = bcryptjs.genSaltSync();
       user.password =  bcryptjs.hashSync( password, salt )

       //Guardar user en BD con pass encriptada

       const userDB = await user.save()
       
       const token = await generarJWT(userDB.id)

       res.status(200).json({
           userDB,
           token
       })
   } catch (error) {
       console.log( error )
       res.status(500).json({
           msg: 'Comunicarse con el adm'
       })
   }

}


module.exports = {
    login,
    register
}