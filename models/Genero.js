
const { DataTypes} = require('sequelize');
const db = require('../db/config');
const Pelicula = require('../models/Pelicula')


const Genero = db.define('Genero', {


    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },

    imagen:{
        type: DataTypes.STRING(1234),
        defaultValue: 'some url'
    }
   
}, { timestamps: false })

Genero.hasOne(Pelicula)


module.exports = Genero;