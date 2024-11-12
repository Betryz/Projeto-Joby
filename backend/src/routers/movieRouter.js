
import { searchMovies } from "../controllers/movies/movieController.js";
import express from 'express'

const router = express.Router();

router.get('/search/:query', searchMovies);

export default router;

