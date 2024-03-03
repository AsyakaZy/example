const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkMiddleware')
const playersClubGuestController = require('../controllers/playersClubGuestController')

router.post('/', playersClubGuestController.create)
router.get('/',  playersClubGuestController.getAll)
router.get('/:id', playersClubGuestController.getOne)
router.put('/:id', playersClubGuestController.change)
router.delete('/:id', checkRole('admin'), playersClubGuestController.delete)

module.exports = router