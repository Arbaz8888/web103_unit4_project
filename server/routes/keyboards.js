import express from 'express'
import KeyboardsController from '../controllers/keyboards.js'

const router = express.Router()

router.get('/', KeyboardsController.getKeyboards)
router.get('/:id', KeyboardsController.getKeyboardById)
router.post('/', KeyboardsController.createKeyboard)
router.patch('/:id', KeyboardsController.updateKeyboard)
router.put('/:id', KeyboardsController.updateKeyboard)
router.delete('/:id', KeyboardsController.deleteKeyboard)

export default router
