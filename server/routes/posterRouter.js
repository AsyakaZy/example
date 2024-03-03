const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkMiddleware')
const posterController = require('../controllers/posterController')

router.post('/', posterController.create)
router.get('/', posterController.getAll)
router.get('/:id', posterController.getOne)
router.put('/:id', posterController.change)
router.delete('/:id', posterController.delete)

module.exports = router