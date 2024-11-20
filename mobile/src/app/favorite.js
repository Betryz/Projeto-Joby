import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useWatchlistStore } from '../stores/useFavoriteStore';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';

export default function Home() {
    const { setWatchlist } = useWatchlistStore();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                const response = await fetchAuth('http://localhost:5000/watch');

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.favorite) {
                        setWatchlist(data.favorite);

                        const movieDetailsPromises = data.favorite.map(async (favoriteItem) => {
                            if (favoriteItem.movie_id) {
                                const movieResponse = await fetchAuth(`http://localhost:5000/movies/movie-info/${favoriteItem.movie_id}`);
                                return movieResponse.ok ? await movieResponse.json() : null;
                            }
                            return null;
                        });

                        const moviesData = await Promise.all(movieDetailsPromises);
                        setMovies(moviesData.filter(movie => movie !== null));
                    }
                }
            } catch (error) {
                console.error('Erro ao realizar o fetch:', error);
            }
        };

        getWatchlist();
    }, [setWatchlist]);


    

    return (
        <View style={styles.container}>
            <ScrollView>

                {movies.length > 0 && (
                    movies.map((movie) => (
                        <View key={movie.id} style={styles.watchlistItem}>
                            {movie.poster_path && (
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                                    style={styles.movieImage}
                                    resizeMode="cover"
                                />
                            )}
                            <Text style={styles.movieText}>Título: {movie.title}</Text>
                            
                        </View>
                    ))
                 
                )} 
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5d5d5',
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10,
    },
    divisor: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
    watchlistItem: {
        padding: 10,
        borderStyle: 'solid',
        borderColor: '#66666666',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        gap: 15,
        marginVertical: 30,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    movieText: {
        fontSize: 16,
        marginTop: 10,
    },
    watchedText: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    movieImage: {
        width: 150,
        height: 220,
        borderRadius: 8,
    },
    emptyMessage: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        color: '#888',
    },
});
