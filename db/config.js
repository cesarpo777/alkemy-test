const { Sequelize } = require('sequelize');

const db = new Sequelize('alkemy', 'root', 'cesar',{
    host:'localhost',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
      }
    //logging: false
}) 

    


module.exports = db;