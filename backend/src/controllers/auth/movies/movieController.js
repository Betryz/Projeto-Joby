const api_key = process.env.TMDB_API_KEY;

export const searchMovies = async (req, res) => {
    const { query } = req.params;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&language=pt-BR`)

        const data = await response.json();

        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar os filmes no TMDB:'.error)
        res.status(500).json({ message: 'Error ao buscar dados do TMDB' });
    }
}