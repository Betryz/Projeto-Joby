import express from 'express'

import reviews from '../controllers/reviews/reviewsController.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.use(auth)
router.post('/' , reviews)


export default router