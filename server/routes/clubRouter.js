const Router = require('express')
const router = new Router()
const clubController = require ('../controllers/clubController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', clubController.create)
router.get('/', clubController.getAll)
router.get('/:id', clubController.getOne)
router.put('/:id', clubController.change)
router.delete('/:id', clubController.delete)

module.exports = router