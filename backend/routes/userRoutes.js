const express = require('express')

const router = express.Router()

const controller = require('../controllers/userController')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieveOne)
router.put('/', controller.update)
router.delete('/', controller.delete)

module.exports = router
