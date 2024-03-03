const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkMiddleware')
const playersController = require('../controllers/playersController')

router.post('/', playersController.create)
router.get('/',  playersController.getAll)
router.get('/:id', playersController.getOne)
router.put('/:id', playersController.change)
router.delete('/:id', checkRole('admin'), playersController.delete)

module.exports = router