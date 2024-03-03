const Router = require('express')
const router = new Router()
const clubGuestController = require ('../controllers/clubGuestController')
const checkRole = require('../middleware/checkMiddleware')

router.post('/', clubGuestController.create)
router.get('/', clubGuestController.getAll)
router.get('/:id', clubGuestController.getOne)
router.put('/:id', clubGuestController.change)
router.delete('/:id', clubGuestController.delete)

module.exports = router