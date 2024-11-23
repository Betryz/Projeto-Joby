import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useWatchlistStore } from '../stores/useFavoriteStore';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import Button from '../components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function Home() {
    const { setWatchlist, deleteWatchlist } = useWatchlistStore();
    const [movies, setMovies] = useState([]);

    const handleDelete = async (watchlistId) => {
        console.log(`Tentando excluir o item com ID da watchlist: ${watchlistId}`);

        const response = await fetchAuth(`http://localhost:5000/favorites/${watchlistId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Item excluído:', data);

            // Atualiza o estado local removendo o filme correspondente
            setMovies((prevMovies) =>
                prevMovies.filter((movie) => movie.watchlistId !== watchlistId)
            );

            deleteWatchlist(watchlistId); // Atualiza a store, se necessário
            return;
        }

        const errorData = await response.json();
        console.error('Erro ao excluir o item:', errorData);
    };

    useEffect(() => {
        const getWatchlist = async () => {
            try {
                const response = await fetchAuth('http://localhost:5000/favorites');

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.favorite) {
                        setWatchlist(data.favorite);


                        const movieDetailsPromises = data.favorite.map(async (favoriteItem) => {
                            if (favoriteItem.movie_id) {
                                const movieResponse = await fetchAuth(
                                    `http://localhost:5000/movies/movie-info/${favoriteItem.movie_id}`
                                );

                                if (movieResponse.ok) {
                                    const movieData = await movieResponse.json();
                                    return { ...movieData, watchlistId: favoriteItem.id }; // Adicione o ID da watchlist
                                }
                            }
                            return null;
                        });

                        const moviesData = await Promise.all(movieDetailsPromises);
                        setMovies(moviesData.filter((movie) => movie !== null));
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


                {movies.length > 0 &&
                    movies.map((movie) => (
                        <View key={movie.watchlistId} style={styles.watchlistItem}>
                            {movie.poster_path && (
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                                    style={styles.movieImage}
                                    resizeMode="cover"
                                />
                            )}

                            <View style={styles.textAndIconContainer}>
                                <Text style={styles.movieText}>Título: {movie.title}</Text>
                                <Ionicons
                                    style={styles.trashIcon}
                                    onPress={() => handleDelete(movie.watchlistId)}
                                    name="trash-bin"
                                    size={24}
                                    color="black"
                                />
                            </View>


                        </View>
                    ))}

                {movies.length === 0 && <Text style={styles.emptyMessage}>Nenhum favorito encontrado.</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffd7',
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 4,
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
        marginVertical: 30,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row', // Organiza os elementos na horizontal
    },
    movieImage: {
        width: 130,
        height: 180,
        borderRadius: 8,
    },
    textAndIconContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginLeft: 10, 
    },
    movieText: {
        fontSize: 16,
        fontWeight: '700',
        flex: 1, 
        maxWidth: 130,
        textAlign: 'center'
    },
    trashIcon: {
        position: 'absolute',
        left: 130,
        top: 90
    },
});

