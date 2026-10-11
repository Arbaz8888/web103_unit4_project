import express from 'express'
import IncompatibilitiesController from '../controllers/incompatibilities.js'

const router = express.Router()

router.get('/', IncompatibilitiesController.getIncompatibilities)

export default router
