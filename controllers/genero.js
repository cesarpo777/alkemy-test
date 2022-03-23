const Genero = require('../models/Genero')

const getAllGeneros = async( req, res ) => {


}

const getGeneroxId = async( req, res ) => {

  

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

   

}

const deleteGenero = async( req, res ) => {

  
}

module.exports = {
    getAllGeneros,
    getGeneroxId,
    createGenero,
    updateGenero,
    deleteGenero
}