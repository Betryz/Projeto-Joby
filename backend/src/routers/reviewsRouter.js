import express from 'express'
import getReviews from '../controllers/reviews/getReviewsController.js'
import reviews from '../controllers/reviews/reviewsController.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.use(auth)
router.post('/' , reviews)
router.get('/', getReviews)


export default router