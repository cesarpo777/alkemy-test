
const { DataTypes } = require('sequelize');
const db = require('../db/config');
const Genero = require('../models/Genero')
const GeneroYPeliculas = require('../models/GeneroYPeliculas')

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

    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }


}, { timestamps: false})

Pelicula.belongsToMany( Genero , { through: GeneroYPeliculas })
Genero.belongsToMany( Pelicula, { through: GeneroYPeliculas })

module.exports = Pelicula;