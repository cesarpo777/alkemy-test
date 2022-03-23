const { Router } = require('express');
const { check, body } = require('express-validator')
const { getAllCharacters, 
        getCharacter, 
        createCharacter, 
        editCharacter, 
        deleteCharacter 
} = require('../controllers/characters');
const movies_characters = require('../models/movies_characters')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { existePersonajeConId, existePersonajeConNombre } = require('../middlewares/db-validators')


const router = Router();

// LISTADO - DEVUELVE IMAGEN Y PERSONAJE - RECIBE QUERY PARAMS 
router.get('/', validarJWT, getAllCharacters)


// Detalle de personaje - Muestra el personaje con todos sus attr y sus apariciones
router.get('/detalle/:id', 
[
  validarJWT,
  check('id').custom( existePersonajeConId ),
  validarCampos 
]
,getCharacter)

// Crear personaje
router.post('/',
[   
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('nombre').trim(),
    check('nombre').custom( existePersonajeConNombre ),
    body('historia').trim(),
    check('historia','El campo historia es obligatorio').not().isEmpty(),
    validarCampos
],
createCharacter)


// Modificar personaje
router.put('/:id', validarJWT ,editCharacter)

// Borrar personaje 
router.delete('/:id',
[
    validarJWT,
    check('id').custom( existePersonajeConId ),
    validarCampos

] ,deleteCharacter)


module.exports = router;