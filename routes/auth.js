const { Router } = require('express');
const { check, body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { login, register } = require('../controllers/auth');
const { existeUserCorreo } = require('../middlewares/db-validators')


const router = Router();


router.post('/login',
[
    body('correo').trim(),
    check('correo','El campo correo debe tener un formato valido').isEmail(),
    body('password').trim(),
    check('password', 'La contraseña debe tener de 4 a 15 caracteres').isLength({ min: 4, max: 15 }),
    validarCampos
] 
,login)

router.post('/register',
[   
    body('nombre').trim(),
    check('nombre','El campo nombre debe tener mas de dos caracteres').isLength({ min: 3 }),
    body('password').trim(),
    check('password', 'La contraseña debe tener de 4 a 15 caracteres').isLength({ min: 4, max: 15 }),
    body('correo').trim(),
    check('correo').custom( existeUserCorreo ),
    validarCampos
]
,register)


module.exports = router;