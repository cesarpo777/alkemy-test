const { Sequelize } = require('sequelize');


//console.log( process.env.DB_NAME ,process.env.DB_USERNAME, process.env.DB_PASS, process.env.DB_HOST)
const db = new Sequelize(process.env.DB_NAME ,process.env.DB_USERNAME, process.env.DB_PASS,{
  host: process.env.DB_HOST,
  dialect: 'mysql',
  dialectOptions: {
      multipleStatements: true
    }
  //logging: false
})

// LOCAL ENVIROMENT
/* const db = new Sequelize('alkemy', 'root', 'cesar',{
    host:'localhost',
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
      }
    //logging: false
}) */

    


module.exports = db;