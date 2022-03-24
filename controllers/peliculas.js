const { Op } = require('sequelize');
const db = require('../db/config');
const Pelicula = require('../models/Pelicula')


const getPeliculas = async( req, res ) => {
    
    const { order = 'asc' } = req.query;

    let query = { activo: true };
    let ordenar = ['fechaDeCreacion', order]
 
  /*   try {
        console.log( req.query.name )
        const peliculas = await Pelicula.findAll({ where: {titulo: {[Op.substring]: '%'+req.query.name+'%' }}, order:})
        res.status(200).json({
            peliculas
        })
    
    } catch (error) {
        console.log( error )
    } */

    if( req.query.name !== undefined && req.query.name.length > 0){
        query['titulo'] = { [Op.substring] : '%'+req.query.name+'%' }
    }

    if( req.query.genre !== undefined && req.query.genre.length > 0){
        query['GeneroId'] = req.query.genre
    }

    if( req.query.order !== undefined && req.query.order.length > 0){
        ordenar[1] = req.query.order
    }

    try {
        
        const peliculas = await Pelicula.findAndCountAll(
            { attributes: [ 'imagen', 'titulo', 'fechaDeCreacion'], 
              where: query,
              order: [ordenar]
            });
        res.status(200).json({
            peliculas
        })
    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error comunicarse con el adm'
        })
    }
 
   

}
const getPelixId = async( req, res ) => {

    const { id } = req.params;

   try {
       const pelicula = await Pelicula.findByPk( id )
       const [personajes, meta] = await db.query('SELECT p.nombre FROM personajes p JOIN movies_characters mc ON p.id = mc.PersonajeId WHERE PeliculaId = ?',
        {replacements: [id]}
       )

       res.status(200).json({
           pelicula,
           personajes
       })
   } catch (error) {
       console.log( error )
       return res.status(500).json({
           msg: 'Ocurrió un error comunicarse con el adm'
       })
   }

}
const createPelicula = async( req, res ) => {

   const data = req.body;

   try {
        
    const pelicula = new Pelicula(data)
    const peliculaGuardada = await pelicula.save()
    console.log(peliculaGuardada)
    res.status(200).json({
        pelicula
    })

   } catch (error) {
       console.log(error)
       res.status(500).json({
           msg: 'hable con el adm'
       })
       
   }
}

const deletePelicula = async( req, res ) => {

    const { id } = req.params;

    try {
      /*   Don't know why I couldn't make this work :I
            const [ deleteAction, peliculaEliminada] = await Promise.all([
            Pelicula.update({ activo: false }, { where: { id }}),
            Pelicula.findOne({ where: { id })
        ]) */
        const affectedRows = await Pelicula.update({ activo: false}, { where:{ id } })
        const peliculaBorrada = await Pelicula.findOne({attributes:['titulo', 'activo'], where: { id }})
        res.status(200).json({
            msg: 'La pelicula ha sido eliminada - activo: false',
            affectedRows,
            peliculaBorrada
        })

    } catch (error) {
        console.log( error )
        return res.status(500).json({
            msg: 'Ocurrió un error, comunicarse con el adm'
        })
    }

}

const updatePelicula = async( req, res ) => {

    const { id } = req.params;
    const { titulo, calificacion, imagen, fechaDeCreacion, GeneroId, activo }= req.body;
    let update = {};
    
    try {
        
        if( titulo ){ update['titulo'] = titulo }
        if( calificacion ){ update['calificacion'] = calificacion }
        if( imagen ){ update['imagen'] = imagen }
        if( fechaDeCreacion ){ update['fechaDeCreacion'] = fechaDeCreacion }
        if( GeneroId ){ update['GeneroId'] = GeneroId }
        if( activo ){ update['activo'] = activo }

        const peliculaModificada = await Pelicula.update( update, { where: { id }})
        console.log( peliculaModificada )
        if( peliculaModificada ){
            const pelicula = await Pelicula.findByPk(id)
            res.status(200).json({
                msg: 'Pelicula acutalizada',
                pelicula
            })
        }
     
    } catch (error) {
        console.log( error )
        return res.status( 500 ).json({
            msg:'Ocurrió un error, comunicarse con el adm'
        })
    }

}

module.exports = {

    getPeliculas,
    getPelixId,
    createPelicula,
    updatePelicula,
    deletePelicula
    
}