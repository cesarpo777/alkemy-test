const { DataTypes } = require('sequelize');
const Pelicula = require('../models/Pelicula')
const movies_characters = require('../models/movies_characters')
const db = require('../db/config');


const Personaje = db.define('Personaje', {

    img:{
        type: DataTypes.STRING(1234),
        defaultValue: 'some url'
    },

    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },

    edad:{
        type: DataTypes.INTEGER,
        defaultValue: 1
    },

    peso:{
        type: DataTypes.STRING,
        defaultValue: "0kg"
    },

    historia:{
        type: DataTypes.STRING(1234)
    },


    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
    
 
}, { timestamps: false })

Personaje.belongsToMany( Pelicula, { through: movies_characters })

module.exports = Personaje;