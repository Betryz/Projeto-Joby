// src/controllers/movieController.js
import { fetchAndSaveMovies, getMovies } from '../../models/moviesModel.js';

export const getMovies = async (req, res) => {
    const { query } = req.params;
    
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=pt-BR`
        , {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
            }
        })

        const data = await response.json();
         
        res.json(data);

        const savedMovies = await fetchAndSaveMovies(query);
        res.json(savedMovies);

    } catch (error) {
        console.error('Erro ao buscar os filmes no TMDB:', error.message);
        res.status(500).json({ message: 'Erro ao buscar dados do TMDB' });
    }
};

export const listMovies = async (req, res) => {
    try {
        const movies = await getMovies();
        res.json(movies);
    } catch (error) {
        console.error('Erro ao listar filmes:', error.message);
        res.status(500).json({ message: 'Erro ao listar filmes' });
    }
};
