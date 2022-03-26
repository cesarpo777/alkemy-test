
const { DataTypes} = require('sequelize');
const db = require('../db/config');
const GeneroYPeliculas = require('./GeneroYPeliculas');
const Pelicula = require('./Pelicula')



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


//Genero.belongsToMany( Pelicula, { through: GeneroYPeliculas})
//Pelicula.belongsToMany( Genero , { through: GeneroYPeliculas })

module.exports = Genero;