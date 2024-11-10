import express from 'express'

import reviews from '../controllers/reviews/reviewsController.js'

const router = express.Router();

router.post('/' , reviews)


export default router