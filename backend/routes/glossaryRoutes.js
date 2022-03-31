const express = require('express')

const router = express.Router()

const controller = require('../controllers/glossaryController')

router.post('/', controller.create)
router.get('/', controller.retrieve)

module.exports = router
