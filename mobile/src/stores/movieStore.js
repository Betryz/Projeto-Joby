// src/store/movieStore.js
import { create } from "zustand";

export const useMovieStore = create((set) => ({
    movies: [],
    loading: false,
    error: null,

    // Função para buscar filmes
    fetchMovies: async (query) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`http://localhost:5000/movies/search/${query}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhlNWExMjBhMTM1ZGYxMGMxNzczODlhODQ4MTczNiIsIm5iZiI6MTczMTQzMjY1OS4wMjk4ODI3LCJzdWIiOiI2NzJkMGViMmViZTIxZGVmMDhjOGRjNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mChbJJ8m8CrsNzRXymoUoy83IdhEpjc9mPVa6WI1loQ'
                }
            });

            if (response.ok) {
                const data = await response.json();
                set({ movies: data || [], loading: false });
            } else {
                const errorMessage = await response.text();
                set({ error: errorMessage, loading: false });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    }
}));
