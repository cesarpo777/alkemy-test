
const { DataTypes} = require('sequelize');
const db = require('../db/config');



const GeneroYPeliculas = db.define('GeneroYPeliculas', {

    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    }
   
}, { timestamps: false })


module.exports = GeneroYPeliculas;