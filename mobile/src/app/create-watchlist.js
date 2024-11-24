import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { useWatchlistStore } from '../stores/useWatchlistStore';
import { fetchAuth } from '../utils/fetchAuth';
import { useMovieStore } from '../stores/movieStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function WatchlistCreator() {
    const { movies, loading, error, fetchMovies } = useMovieStore();
    const { addToWatchlist } = useWatchlistStore();
    const router = useRouter();

    const [txtDescription, setTxtDescription] = useState('');
    const [txtName, setTxtName] = useState('');
    const [query, setQuery] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);

    const handleCreateWatchlist = async () => {
        const watchlist = {
            description: txtDescription,
            name: txtName,
            movies: selectedMovies,
        };

        const response = await fetchAuth('http://localhost:5000/watchlist', {
            method: 'POST',
            body: JSON.stringify(watchlist),
        });

        if (response.ok) {
            const data = await response.json();
            addToWatchlist(data.watchlist);
            setTxtDescription('');
            setTxtName('');
            setSelectedMovies([]);
            router.back();
        } else {
            const data = await response.json();
            console.log(data?.error);
        }
    };

    const handleSearch = () => {
        if (query) {
            fetchMovies(query);
        }
    };

    const toggleSelection = (movieId) => {
        setSelectedMovies((prev) =>
            prev.includes(movieId)
                ? prev.filter((id) => id !== movieId)
                : [...prev, movieId]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        onChangeText={setTxtName}
                        value={txtName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Descrição"
                        onChangeText={setTxtDescription}
                        value={txtDescription}
                    />
                </View>

                <Text style={styles.text}>Selecione o filme desejado na lista</Text>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Pesquise"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <Ionicons name="search-sharp" size={24} color="black" />
                </View>

                {loading && <Text>Carregando...</Text>}
                {error && <Text>Erro: {error}</Text>}

                {movies.length > 0 &&
                    movies.map((movie) => (
                        <View key={movie.id} style={styles.card}>
                            <TouchableOpacity
                                style={styles.radio}
                                onPress={() => toggleSelection(movie.id)}
                            >
                                {selectedMovies.includes(movie.id) ? (
                                    <View style={styles.radioSelected} />
                                ) : null}
                            </TouchableOpacity>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
                                style={styles.image}
                            />
                            <View style={styles.details}>
                                <Text style={styles.title}>{movie.title}</Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button onPress={handleCreateWatchlist}>Criar</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffd7',
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ebce73',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    radio: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#444',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    radioSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#444',
    },
    image: {
        width: 80,
        height: 120,
        borderRadius: 4,
    },
    details: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 15,
        borderRadius: 5,
    },
    inputGroup: {
        paddingHorizontal: 20,
    },
    searchBar: {
        flexDirection: 'row',
        backgroundColor: '#ffffd7',
        borderRadius: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        paddingHorizontal: 9,
        paddingVertical: 6,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 10,
    },
});
