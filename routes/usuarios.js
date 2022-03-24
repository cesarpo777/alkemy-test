const { Router } = require('express');
const { check, body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { existeUserId } = require('../middlewares/db-validators')
const { getUsuarios,
        getUsuarioxId,
        updateUsuario,
        deleteUsuario
} = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// DEVUELVE TODOS LOS USUARIOS ACTIVOS - NECESITA TOKEN
router.get('/', validarJWT ,getUsuarios )

// DEVUELVE USUARIO POR ID - NECESITA TOKEN
router.get('/:id', 
[
    validarJWT,
    check('id').custom( existeUserId ),
    validarCampos
]      
,getUsuarioxId )

// "ELIMINA" USUARIO ACTIVO - FALSE - NECESITA TOKEN
router.delete('/:id',
[   
    validarJWT,
    check('id').custom( existeUserId ),
    validarCampos
]
,deleteUsuario )


// MODIFICA EL USUARIO - NECESITA TOKEN
// EL USUARIO PUEDE MODIFICAR TODOS SUS CAMPOS. EL FRONT DEBERIA HACER UN FETCH DE TODOS SUS DATOS Y AUTOCOMPLETAR 
//LOS CAMPOS DEL FORMULARIO CON LOS DATOS QUE PROVIENEN DE LA BD
router.put('/:id',
[
    validarJWT,
    check('id').custom( existeUserId ),
    body('nombre').trim(),
    check('nombre','El campo nombre debe tener mas de dos caracteres').isLength({ min: 3 }),
    body('password').trim(),
    check('password', 'La contraseña debe tener de 4 a 15 caracteres').isLength({ min: 4, max: 15 }),
    body('correo').trim(),
    check('correo','El campo correo debe tener un formato válido').isEmail(),
    validarCampos
]
,updateUsuario )


module.exports = router;