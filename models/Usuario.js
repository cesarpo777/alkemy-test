const { DataTypes } = require('sequelize');
const db = require('../db/config');

const Usuario = db.define('Usuario', {

    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },

    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password:{
        type: DataTypes.STRING,
        allowNull: false
    },

    activo:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
   
}, { timestamps: false })

module.exports = Usuario;