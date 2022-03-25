const Usuario = require('../models/Usuario')
const Personaje = require('../models/Personaje')
const Pelicula = require('../models/Pelicula')
const Genero = require('../models/Genero')


/*** USUARIOS ***/
const existeUserCorreo = async( correo ) => {
    
    const existeCorreo = await Usuario.findOne({ where: { correo: correo }})
    if( existeCorreo ){
        throw new Error(`Ya existe un usuario con el correo: ${ correo }`)
    }
}

const existeUserId = async( id ) => {

    const existeUser = await Usuario.findOne({ where:{ id }})
    if( !existeUser ){
        throw new Error(`No existe un usuario con el id: ${id}`)
    }
    
}
/** PELICULAS ***/

const existePeliculaConId = async( id ) => {

    const existePelicula = await Pelicula.findAll({ where: { id: id , activo: true }} )
 
    if( existePelicula.length === 0 ){
        throw new Error(`No existe una pelicula con el id: ${ id }`)
    }
}

const existePeliculaConNombre = async( titulo ) => {

    const existePelicula = await Pelicula.findOne({ where: { titulo }})
    if( existePelicula ){
        throw new Error(`Ya existe una pelicula con el nombre: ${ titulo }`)
    }

}

/** PERSONAJES ***/

const existePersonajeConNombre = async( nombre ) => {

    const existePersonaje = await Personaje.findAll( { where: { nombre: nombre , activo: true }})
    console.log( existePersonaje )
    if( existePersonaje.length === 1){
        throw new Error(`Ya existe un personaje con el nombre: ${ nombre }`)
    }

}

const existePersonajeConId = async( id ) => {
    
    const existePersonaje = await Personaje.findAll( { where: { id: id , activo: true }})
    console.log( existePersonaje )
    if( existePersonaje.length === 0 ){
        throw new Error(`No existe un personaje con id: ${id}`)
    }
}

/** GENERO */

const existeGeneroConId = async( genero ) => {
    
    const existeGenero = await Genero.findByPk( genero )
    console.log( existeGenero )
    if(!existeGenero){
        throw new Error(`El género ${ genero } no es un género válido`)
    }
}

module.exports = {
    existeUserCorreo,
    existePersonajeConId,
    existePersonajeConNombre,
    existePeliculaConId,
    existePeliculaConNombre,
    existeUserId,
    existeGeneroConId
}