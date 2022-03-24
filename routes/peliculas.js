const { Router } = require('express');
const { check, body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getPeliculas,
        getPelixId,
        createPelicula,
        updatePelicula,
        deletePelicula
} = require('../controllers/peliculas');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existePeliculaConId, existePeliculaConNombre } = require('../middlewares/db-validators');

const router = Router();


// LISTADO - DEVUELVE IMAGEN, TITULO Y FECHA DE CREACION - RECIBE QUERY PARAMS
router.get('/',validarJWT ,getPeliculas )

// DETALLE DE PELICULA - DEVUELVE PELICULA CON TODOS SUS ATTR + PERSONAJES QUE APARECEN EN LA PELICULA
router.get('/detalle/:id',
[
    validarJWT,
    check('id').custom( existePeliculaConId ),
    validarCampos
]
,getPelixId )

// CREAR PELICULA
router.post('/',
[
   validarJWT,
   check('titulo','El campo titulo es obligatorio').not().isEmpty().trim(),
   check('titulo').custom( existePeliculaConNombre ),
   check('GeneroId', 'La pelicula debe pertenecer a un genero').not().isEmpty(),
   validarCampos
] ,createPelicula )


// ACTUALIZAR PELICULA
router.put('/:id',
[
    validarJWT,
    check('id').custom( existePeliculaConId ),
    body('titulo').trim(),
    //check('titulo').custom( existePeliculaConNombre ),
    validarCampos
]
,updatePelicula )


// ELIMINAR PELICULA - ACTIVO FALSE
router.delete('/:id', 
[
    validarJWT,
    check('id').custom( existePeliculaConId ),
    validarCampos
], deletePelicula)

module.exports = router;