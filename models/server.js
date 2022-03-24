const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('../db/config')

class Server{

    constructor(){

        this.app = express();

        this.paths = {
            auth: '/auth',
            characters: '/characters',
            generos: '/genero',
            peliculas:'/movies',
            usuarios: '/usuarios'
        }
        
        
        this.conectarDB()
        this.middlewares()
        this.routes()
        
        /* this.corsOptions = {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200 
        } */
    }
    
    async conectarDB(){
        
        try {
            await db.authenticate()
            await db.sync()
            console.log('database online')
        } catch (error) {
            //throw new Error ( error )
            console.log(error)
        }
    }
    
    middlewares(){
        
        // cors
        this.app.use( cors())
        
        // lectura y parseo del body
        this.app.use( express.json() )
        
    }

    routes(){

        this.app.use( this.paths.auth, require('../routes/auth') ),
        this.app.use( this.paths.characters, require('../routes/characters') ),
        this.app.use( this.paths.generos, require('../routes/genero')),
        this.app.use( this.paths.peliculas, require('../routes/peliculas')),
        this.app.use( this.paths.usuarios, require('../routes/usuarios') )
       
    }

    listen(){
        this.app.listen( process.env.PORT, () => {
            console.log( 'server on port : ' , process.env.PORT )
        })
    }

}
module.exports = Server;