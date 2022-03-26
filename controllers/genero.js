const { Op } = require('sequelize');
const Genero = require('../models/Genero')
const Pelicula = require('../models/Pelicula')

const getAllGeneros = async( req, res ) => {

    try {
        const generos = await Genero.findAll({
            attributes:['nombre'],
            include:{
                model: Pelicula,
                attributes:['titulo'],
                through:{
                    attributes:[]
                } 
            }
        })
        res.status(200).json({
            generos
        })
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error comunicarse con el adm'
        })
        
    }

}

const getGeneroxId = async( req, res ) => {

  const { id } = req.params;

  try {
    const genero = await Genero.findOne({ 
        where: { id },
        attributes:['nombre'],
        include:{
            model: Pelicula,
            attributes:['titulo'],
            through:{
                attributes:[]
            }
        }
    })  
    res.status(200).json({
        genero
    })
  } catch (error) {
      console.log(error)
      return res.status(500).json({
          msg: 'Ocurrió un error, comunicarse con el adm'
      })
  }

}

const createGenero = async( req, res ) => {

    const data = req.body;

    try {
        const genero = await Genero.create( data )
        res.status(200).json({
            msg: 'Genero creado exitosamente',
            genero
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Comunicarse con el adm'
        })
    }
  
}

const updateGenero  = async( req, res ) => {

   const { id } = req.params;
   const { nombre , ...resto } = req.body;

   try {
       const existeGenero = await Genero.findAll({ where: { nombre , id: { [Op.ne]: id }}})
       if( existeGenero.length === 1 ){
           return res.status(400).json({
               msg:`Ya existe un genero con el nombre ${ nombre }`
           })
       }

       const genero = await Genero.update({nombre, ...resto },{ where: { id }})
       const generoMod = await Genero.findByPk(id)

       res.status(200).json({
           msg: 'El género ha sido actualizado',
           generoMod
       })

   } catch (error) {
       console.log( error )
       return res.status(500).json({
           msg:'Ocurrió un error comunicarse con el adm'
       })
   }

}



module.exports = {
    getAllGeneros,
    getGeneroxId,
    createGenero,
    updateGenero
}