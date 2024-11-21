
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { useTableStore } from '../stores/useTableStore';
import { fetchAuth } from '../utils/fetchAuth';
import { useMovieStore } from '../stores/movieStore';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Table() {
    const { movies, loading, error, fetchMovies } = useMovieStore();
    const { addTable } = useTableStore();
    const router = useRouter();

    const [txtDescription, setTxtDescription] = useState('');
    const [txtName, setTxtName] = useState('');
    const [query, setQuery] = useState('');
    const [selectedMovies, setSelectedMovies] = useState([]);

    const handleCreateTable = async () => {
        const table = {
            description: txtDescription,
            name: txtName,
            movies: selectedMovies,
        };

        const response = await fetchAuth('http://localhost:5000/watchlist', {
            method: 'POST',
            body: JSON.stringify(table),
        });

        if (response.ok) {
            const data = await response.json();
            addTable(data.table);
            setTxtDescription('');
            setTxtName('');
            setSelectedMovies([]);
            router.back();
        } else {
            const data = await response.json();
            console.log(data?.error);
        }
        return;
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

            <View style={styles.avaliador}>

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

            <ScrollView style={styles.container}>

                <Text style={styles.text}>
                    Selecione o filme desejado na lista
                </Text>
                <View style={styles.barra}>


                    <TextInput
                        style={styles.pesquisa}
                        placeholder="Pesquise"
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={handleSearch}
                    />
                    <Ionicons name="search-sharp" size={24} color="black" />
                </View>

                {loading && <Text>Carregando...</Text>}
                {error && <Text>Erro: {error}</Text>}

                {movies.length > 0 && (
                    movies.map((movie) => (
                        <View key={movie.id} style={styles.card}>
                            <TouchableOpacity
                                style={styles.radio}
                                onPress={() => toggleSelection(movie.id)}>

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
                    ))
                )}


            </ScrollView>

            <Button style={styles.Button} onPress={handleCreateTable}>
                    Criar
                </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d5d5d5',
        flex: 1,
        paddingVertical: 10
    },
    Button: {
        display: 'flex',
        position: 'absolute', 
        bottom: 0, 
        left: 0,
        right: 0,
        height: 60, 
        backgroundColor: '#ACCE91', 
        borderTopWidth: 1, 
        fontSize: 20,
        borderTopColor: '#d4d4d4',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
    },
    sinopse: {
        fontSize: 14,
        color: '#666',
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 15,
        borderRadius: 5,
    },
    avaliador: {
        paddingHorizontal: 20,
    },
    barra: {
        flexDirection: 'row',
        backgroundColor: '#d5d5d5',
        borderRadius: 5,
        padding: 4,
        marginHorizontal: 12,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
    },
    pesquisa: {
        paddingVertical: 6,
        paddingHorizontal: 6,
        flex: 1,
    },
    noResult: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noResultSub: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
    },
    text: {
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        paddingVertical: 10

    },
    titulo: {
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        paddingVertical: 10
    },
    divisor: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: '100%',

        justifyContent: 'center'
    }
});
