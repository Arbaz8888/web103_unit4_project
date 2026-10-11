import express from 'express'
import FeaturesController from '../controllers/features.js'

const router = express.Router()

router.get('/', FeaturesController.getFeatures)
router.get('/:slug', FeaturesController.getFeatureBySlug)

export default router
