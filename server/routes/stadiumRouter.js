const Router = require('express')
const router = new Router()
const stadiumController = require('../controllers/stadiumController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', stadiumController.create)
router.get('/', stadiumController.getAll)
router.get('/:id',stadiumController.getOne)
router.put('/:id', checkRole('admin'), stadiumController.change)
router.delete('/:id', checkRole('admin'), stadiumController.delete)

module.exports = router