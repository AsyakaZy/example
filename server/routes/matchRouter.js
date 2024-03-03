const Router = require('express')
const router = new Router()
const matchController = require('../controllers/matchController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', matchController.create)
router.get('/', matchController.getAll)
router.get('/:id', matchController.getOne)
router.put('/:id', matchController.change)
router.delete('/:id', matchController.delete)

module.exports = router