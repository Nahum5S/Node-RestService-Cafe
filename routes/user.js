const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete } = require('../controllers/user');
const { isRoleValid, existEmail, existUserId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



router.get('/', userGet);

router.post('/',[
   check('correo','El correo no es válido').isEmail(),
   check('correo').custom(existEmail),
   check('nombre','El nombre es obligatorio').not().isEmpty(),
   check('password','El password debe de contener más de 6 letras').isLength({min:6}),
   //check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom( isRoleValid ),
   validarCampos
] ,userPost);

router.put('/:id',[
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom( existUserId ),
   check('rol').custom( isRoleValid ),
   validarCampos
] ,userPut);

router.delete('/:id',[
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom( existUserId ),
   validarCampos
] ,userDelete);




module.exports = router;

