
export const searchMovies = async (req, res) => {
    const { query } = req.params;
    const api_key = process.env.TMDB_API_KEY;

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=pt-BR`
        , {
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer 528e5a120a135df10c177389a8481736'
            }
        })

        const data = await response.json();
         
        res.json(data);
    } catch (error) {
        console.error('Erro ao buscar os filmes no TMDB:', error.message)
        res.status(500).json({ message: 'Error ao buscar dados do TMDB' });
    }
}