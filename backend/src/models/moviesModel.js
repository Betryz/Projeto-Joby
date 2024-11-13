export const getMovieByIdModel = async (id) => {
    const api_key = process.env.TMDB_API_KEY;
    
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`, {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}` 
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Erro ao buscar o filme com ID ${id}`);
    }

    const data = await response.json();
    return data;
};