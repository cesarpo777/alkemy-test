const { Op } = require('sequelize');
const db = require('../db/config');
const Genero = require('../models/Genero');
const Pelicula = require('../models/Pelicula')


const getPeliculas = async (req, res) => {

    const { order = 'asc' } = req.query;

    if( req.query.genre !== undefined && req.query.genre.length > 0){
        try {
            const peliculas = await Pelicula.findAndCountAll({
                where:{ activo: true },
                order:[['fechaDeCreacion', order ]],
                attributes: ['titulo'], 
                include: { 
                    model: Genero, 
                    where:{ id: req.query.genre },
                    attributes:['nombre'],
                    through:{
                        attributes:[]
                    } 
                }})
            res.status(200).json({
                peliculas
            })
            
        } catch (error) {
            console.log( error)
            return res.status(500).json({
                msg: 'Ocurrio un error comunicarse con el adm'
            })
        }
    }else if(req.query.name !== undefined && req.query.name.length > 0){
        try {
            
            const peliculas = await Pelicula.findAndCountAll({
                attributes:['imagen','titulo', 'fechaDeCreacion'], 
                where: { activo: true, 
                        titulo:{ [Op.substring]: '%'+ req.query.name + '%' }},
                order:[['fechaDeCreacion', order ]]
            })
            res.status(200).json({
                peliculas
            })
        } catch (error) {
            console.log( error)
            return res.status(500).json({
                msg: 'Ocurrio un error comunicarse con el adm'
            })
        }
    }else{
        try {
            
            const peliculas = await Pelicula.findAndCountAll({
                attributes:['imagen','titulo', 'fechaDeCreacion'], 
                where:{ activo: true },
                order:[['fechaDeCreacion', order ]]
            })
            res.status(200).json({
                peliculas
            })
        } catch (error) {
            console.log( error)
            return res.status(500).json({
                msg: 'Ocurrio un error comunicarse con el adm'
            })
        }
    }
 
}
const getPelixId = async (req, res) => {

    const { id } = req.params;

    try {
        const pelicula = await Pelicula.findByPk(id)
        const [personajes, meta] = await db.query('SELECT p.nombre FROM personajes p JOIN movies_characters mc ON p.id = mc.PersonajeId WHERE PeliculaId = ?',
            { replacements: [id] }
        )
        const [generos, extra] = await db.query('SELECT g.nombre FROM generos g JOIN generoypeliculas gp ON g.id = gp.GeneroId where PeliculaId = ?',
            { replacements: [id] }
        )

        res.status(200).json({
            pelicula,
            personajes,
            generos
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error comunicarse con el adm'
        })
    }

}
const createPelicula = async (req, res) => {

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

const deletePelicula = async (req, res) => {

    const { id } = req.params;

    try {
        /*   Don't know why I couldn't make this work :I
              const [ deleteAction, peliculaEliminada] = await Promise.all([
              Pelicula.update({ activo: false }, { where: { id }}),
              Pelicula.findOne({ where: { id })
          ]) */
        const affectedRows = await Pelicula.update({ activo: false }, { where: { id } })
        const peliculaBorrada = await Pelicula.findOne({ attributes: ['titulo', 'activo'], where: { id } })
        res.status(200).json({
            msg: 'La pelicula ha sido eliminada - activo: false',
            affectedRows,
            peliculaBorrada
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error, comunicarse con el adm'
        })
    }

}

const updatePelicula = async (req, res) => {

    const { id } = req.params;
    const { titulo, calificacion, imagen, fechaDeCreacion, GeneroId, activo } = req.body;
    let update = {};

    try {

        const existeNombre = await Pelicula.findAll({ where: { id: { [Op.ne]: id }, titulo: titulo } })
        if (existeNombre.length === 1) {
            return res.status(400).json({
                msg: `Ya existe una pelicula con el nombre ${titulo}`
            })
        }

        if (titulo) { update['titulo'] = titulo }
        if (calificacion) { update['calificacion'] = calificacion }
        if (imagen) { update['imagen'] = imagen }
        if (fechaDeCreacion) { update['fechaDeCreacion'] = fechaDeCreacion }
        if (GeneroId) { update['GeneroId'] = GeneroId }
        if (activo) { update['activo'] = activo }

        const peliculaModificada = await Pelicula.update(update, { where: { id } })
        console.log(peliculaModificada)
        if (peliculaModificada) {
            const pelicula = await Pelicula.findByPk(id)
            res.status(200).json({
                msg: 'Pelicula acutalizada',
                pelicula
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Ocurrió un error, comunicarse con el adm'
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