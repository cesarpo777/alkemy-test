const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { getUsuarios,
        getUsuarioxId,
        updateUsuario,
        deleteUsuario
} = require('../controllers/usuarios')

const router = Router();

router.get('/', getUsuarios )

router.get('/:id', getUsuarioxId )

router.delete('/:id', deleteUsuario )

router.put('/:id', updateUsuario )


module.exports = router;