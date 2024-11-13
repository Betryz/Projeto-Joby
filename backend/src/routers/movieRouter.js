
import { getMovies } from "../controllers/movies/getMovieController.js";
import express from 'express'
import { getMovieById } from "../controllers/movies/getMovieByIdController.js";

const router = express.Router();

router.get('/search/:query', getMovies);
router.get('/movie-info/:id', getMovieById);

export default router;

