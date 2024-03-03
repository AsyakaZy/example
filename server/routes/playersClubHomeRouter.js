const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkMiddleware')
const playersClubHomeController = require('../controllers/playersClubHomeController')

router.post('/', playersClubHomeController.create)
router.get('/',  playersClubHomeController.getAll)
router.get('/:id', playersClubHomeController.getOne)
router.put('/:id', playersClubHomeController.change)
router.delete('/:id', checkRole('admin'), playersClubHomeController.delete)

module.exports = router