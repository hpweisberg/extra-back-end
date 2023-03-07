const router = require('express').Router()
const itemsCtrl = require('../controllers/items.js')
const middleware = require('../middleware/auth.js')

const { decodeUserFromToken, checkAuth } = middleware

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, itemsCtrl.index)
router.put('/:id/add-photo', checkAuth, itemsCtrl.addPhoto)

module.exports = router
