const Router = require('express')
const router = new Router()
const clubHomeController = require('../controllers/clubHomeController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', clubHomeController.create)
router.get('/', clubHomeController.getAll)
router.get('/:id', checkRole('admin'),clubHomeController.getOne)
router.put('/:id', checkRole('admin'), clubHomeController.change)
router.delete('/:id', clubHomeController.delete)

module.exports = router