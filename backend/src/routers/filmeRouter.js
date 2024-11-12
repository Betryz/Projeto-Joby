import express from 'express'

import filme from '../controllers/filme/filmeController.js'

const router = express.Router();

router.post('/' , filme)


export default router