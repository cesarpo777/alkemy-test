
const { DataTypes} = require('sequelize');
const db = require('../db/config');

const GeneroPeliculaSerie = db.define('GeneroPeliculaSerie', {

    generoPeliculaSerieId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
   
}, { timestamps: false })



module.exports = GeneroPeliculaSerie;