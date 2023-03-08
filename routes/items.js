const router = require('express').Router()
const itemsCtrl = require('../controllers/items.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, itemsCtrl.index)
router.get('/:id', checkAuth, itemsCtrl.show)
router.post('/', checkAuth, itemsCtrl.create)
router.put('/:id', checkAuth, itemsCtrl.update)
router.put('/:id/add-photo', checkAuth, itemsCtrl.addPhoto)
router.delete('/:id', checkAuth, itemsCtrl.delete)

module.exports = router
