import { searchMovies } from "../controllers/auth/movies/movieController.js";

const router = express.Router();

router.get('/search/:query', searchMovies);

export default router;