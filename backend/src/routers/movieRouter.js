import { getMovieById } from "../controllers/movies/getMovieByIdController.js";
import { searchMovies } from "../controllers/movies/movieController.js";
import express from 'express'

const router = express.Router();

router.get('/search/:query', searchMovies);
router.get('/movie-info/:id', getMovieById);

export default router;

