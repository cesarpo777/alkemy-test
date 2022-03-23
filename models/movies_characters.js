
const { DataTypes } = require('sequelize');
const db = require('../db/config');




const movies_characters = db.define('movies_characters', {


    PersonajeId:{
        type: DataTypes.INTEGER
    },

    PeliculaId:{
        type: DataTypes.INTEGER
    }


},{timestamps: false, freezeTableName: true})

module.exports = movies_characters;