const Usuario = require('../models/Usuario')
const Personaje = require('../models/Personaje')
const Pelicula = require('../models/Pelicula')


/*** USUARIOS ***/
const existeUserCorreo = async( correo ) => {
    
    const existeCorreo = await Usuario.findOne({ where: { correo: correo }})
    if( existeCorreo ){
        throw new Error(`Ya existe un usuario con el correo: ${ correo }`)
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

    if( existePersonaje.length === 0 ){
        throw new Error(`No existe un personaje con id: ${id}`)
    }
}

module.exports = {
    existeUserCorreo,
    existePersonajeConId,
    existePersonajeConNombre,
    existePeliculaConId,
    existePeliculaConNombre
}