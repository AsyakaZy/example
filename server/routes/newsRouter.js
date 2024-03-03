const Router = require('express')
const router = new Router()
const newsController = require('../controllers/newsController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', newsController.create)
router.get('/', newsController.getAll)
router.get('/:id', newsController.getOne)
router.put('/:id', newsController.change)
router.delete('/:id', newsController.delete)

module.exports = router