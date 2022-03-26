const { Router } = require('express');
const { check, body } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')

const {
    getAllGeneros,
    getGeneroxId,
    createGenero,
    updateGenero,
   
} = require('../controllers/genero');
const { existeGeneroConId } = require('../middlewares/db-validators');

const router = Router();

router.get('/',validarJWT ,getAllGeneros)

router.get('/:id',
[
    validarJWT,
    check('id').custom( existeGeneroConId ),
    validarCampos 
]
,getGeneroxId )

router.post('/',
[
    validarJWT,
    body('nombre').trim(),
    check('nombre','El campo nombre es obligatorio').not().isEmpty(),
    validarCampos

],
createGenero )

router.put('/:id',
[
    validarJWT,
    check('id').custom( existeGeneroConId ),
    body('nombre').trim(),
    check('nombre','El campo nombre es obligatorio').not().isEmpty(),
    validarCampos
]
,updateGenero )



module.exports = router;