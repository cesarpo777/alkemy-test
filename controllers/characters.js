const { Op } = require('sequelize')

const db = require('../db/config')
const movies_characters = require('../models/movies_characters')
const Personaje = require('../models/Personaje')


const getAllCharacters = async ( req, res ) => {

   let query = {
       activo: true
   }


   if( req.query.name !== undefined && req.query.name.length > 0){
   // { [Op.substring] : '%'+req.query.name+'%' }
       query['nombre'] = {[Op.substring]: '%'+req.query.name+'%'}
   }

   if( req.query.age !== undefined && req.query.age.length > 0){
       let numericEdad = Number( req.query.age )
       console.log( typeof numericEdad )
       query['edad'] = numericEdad
   }

   if( req.query.peso !== undefined && req.query.peso.length > 0){
       query['peso'] = req.query.peso
   }

   if( req.query.peliculas !== undefined && req.query.peliculas.length > 0){
       query['peliculas'] = req.query.peliculas
   }

   /* if( req.query.movies !== undefined && req.query.movies.length > 0){
       query['movieId'] = req.query.movies
   } */

   const characters = await Personaje.findAndCountAll({attributes: ['nombre', 'img'],
            where: query
        });

   if( characters.rows.length === 0){
       return res.status(400).json({
           msg: 'No se encontró ningun personaje con los parametros especificados'
       })
   }
            

   res.status(200).json({
       characters
   })

}

const getCharacter = async( req, res ) => {

    const { id } = req.params;
    
    let numberId = Number(id)
    
    try {
        const character = await Personaje.findAll({ where:{ id: id , activo: true }})
        const [apariciones, meta ]= await db.query('SELECT p.titulo FROM peliculas p JOIN movies_characters mc ON p.id = mc.PeliculaId WHERE PersonajeID = ?',{
            replacements:[numberId]
        })
        
        res.status(200).json({
            character,
            apariciones
        }) 

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error, comunicarse con el adm'
        })
    }
   

}

const createCharacter = async ( req, res ) => {

    const data = req.body;

    try {
        const character = await Personaje.create( data )
            
        res.status(200).json({
            msg: 'Personaje creado !',
            character
        })
        
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error, comunicarse con el adm'
        })
    }
   

}


const editCharacter = async( req, res ) => {

    const { id } = req.params;
    const { nombre, historia, edad, img, peso, activo  }= req.body;
    let update = { nombre, historia , edad };

    try {

        const existeNombre = await Personaje.findAll({ where:{ id: {[Op.ne]: id} , nombre: nombre }})
        if( existeNombre.length === 1){
            return res.status(400).json({
                msg:`Ya existe una personaje con el nombre ${ nombre }`
            })
        }

        if( edad ){ update['edad'] = edad }
        if( img ){ update['img'] = img }
        if( peso ){ update['peso'] = peso }
        if( activo ){ update['activo'] = activo }

        const personajeModificado = await Personaje.update( update, { where: { id }})
        console.log( personajeModificado )
        if( personajeModificado ){
            const personaje = await Personaje.findByPk(id)
            res.status(200).json({
                msg: 'Personaje acutalizado',
                personaje
            })
        }
     
    } catch (error) {
        console.log( error )
        return res.status( 500 ).json({
            msg:'Ocurrió un error, comunicarse con el adm'
        })
    }

}

const deleteCharacter = async ( req, res ) => {

  const { id } = req.params;

  try {
      
      const editedCharacter = await Personaje.update({ activo: false }, { where:{
          id: id
      } })

      const personajeBorrado = await Personaje.findOne({attributes:['nombre', 'activo'], where:{ id }})

      res.status(200).json({
          msg:'El personaje ha sido eliminado - activo: false',
          personajeBorrado
      })

  } catch (error) {
      console.log( error )
      res.status(500).json({
          msg:'Ocurrio un error al eliminar el personaje, comunicate con el adm del servidor'
      })
  }
}


module.exports = {

    getAllCharacters,
    getCharacter,
    createCharacter,
    editCharacter,
    deleteCharacter

}