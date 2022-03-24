
const { DataTypes } = require('sequelize');
const db = require('../db/config');
const movies_characters = require('../models/movies_characters')
const Personaje = require('../models/Personaje')




const Pelicula = db.define('Pelicula', {

    titulo: {
        type: DataTypes.STRING,
        allowNull: false, 
    },

    imagen:{
        type: DataTypes.STRING(1234),
        defaultValue:'some url'
    },

    fechaDeCreacion: {
        type: DataTypes.DATEONLY
    },

    calificacion:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    GeneroId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }


}, { timestamps: false})



module.exports = Pelicula;