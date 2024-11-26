import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useWatchlistStore } from '../stores/useWatchlistStore';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function manageWatchlist() {

    const { watchlist, setWatchlist } = useWatchlistStore();
    const [loading, setLoading] = useState(true);

    const handleDeleteWatchlist = async (watchlistId) => {
        try {
            const response = await fetchAuth(`http://localhost:5000/watchlist/${watchlistId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setWatchlist((prevWatchlists) =>
                    prevWatchlists.filter((item) => item.id !== watchlistId)
                );
            } else {
                const errorData = await response.json();
                console.error('Erro ao excluir a watchlist:', errorData);
            }
        } catch (error) {
            console.error('Erro ao excluir a watchlist:', error);
        }
    };

    useEffect(() => {
        const getWatchlists = async () => {
            try {
                setLoading(true);
                const response = await fetchAuth('http://localhost:5000/watchlist');

                if (response.ok) {
                    const data = await response.json();
                    if (data && data.watchlist) {
                        setWatchlist(data.watchlist);
                    }
                }
            } catch (error) {
                console.error('Erro ao realizar o fetch:', error);
            } finally {
                setLoading(false);
            }
        };

        getWatchlists();
    }, [setWatchlist]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {Array.isArray(watchlist) && watchlist.length > 0 ? (
                    watchlist.map((item) => (
                        <View key={item.id} style={styles.watchlistContainer}>
                            <View style={styles.info}>
                                <View>
                                    <Text style={styles.watchlistName}>Nome: {item.name}</Text>
                                    <Text style={styles.watchlistDescription}>
                                        Descrição: {item.description}
                                    </Text>
                                </View>
                                <Ionicons
                                    style={styles.trashIcon}
                                    onPress={() => handleDeleteWatchlist(item.id)}
                                    name="trash-bin"
                                    size={24}
                                    color="black"
                                />
                            </View>

                            {item.movies &&
                                item.movies.length > 0 &&
                                item.movies.map((movie) => (
                                    <View key={movie.id} style={styles.watchlistItem}>
                                        {movie.poster_path && (
                                            <Image
                                                source={{
                                                    uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
                                                }}
                                                style={styles.movieImage}
                                                resizeMode="cover"
                                            />
                                        )}
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.movieText}>{movie.title}</Text>
                                            <Text style={styles.watchedText}>
                                                Lançamento: {new Date(movie.release_date).toLocaleDateString()}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Nenhuma watchlist ou filme disponível.</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffd7',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: '#555',
    },
    watchlistContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    watchlistName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    watchlistDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    watchlistItem: {
        borderStyle: 'solid',
        borderColor: '#66666666',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        gap: 15,
        marginVertical: 10,
        marginHorizontal: 4,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    movieText: {
        fontSize: 13,
        maxWidth: 100,
        textAlign: 'center',
    },
    watchedText: {
        fontSize: 10,
        color: '#555',
        marginTop: 5,
        maxWidth: 140,
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
