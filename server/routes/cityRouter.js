const Router = require('express')
const router = new Router()
const cityController = require('../controllers/cityController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', cityController.create) // Проверяем, имеет ли пользователь roleId=2 перед добавлением города
router.get('/', cityController.getAll)
router.get('/:id', cityController.getOne)
router.put('/:id', checkRole('admin'), cityController.change)
router.delete('/:id', checkRole('admin'), cityController.delete)

module.exports = router