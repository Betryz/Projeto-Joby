import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useEffect } from 'react';
import { useTableStore } from '../stores/useTableStore.js';

export default function WatchtsLists() {
    const { tablet, setTable } = useTableStore();

    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await fetch('http://localhost:5000/watchlist/list');

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.table) {
                        setTable(data.table);
                    }
                } else {
                    console.error('Erro ao buscar os dados:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao realizar o fetch:', error);
            }
        };

        getTables();
    }, [setTable]);

    return (
        <View style={styles.container}>
            <ScrollView>
                {tablet.length > 0 ? (
                    tablet.map((item) => (

                        <View key={item.id} style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>Nome: {item.name}</Text>
                            <Text style={styles.itemDescription}>Descrição: {item.description}</Text>
                            <Text style={styles.itemMovies}>Filmes:</Text>
                            {Array.isArray(item.movies) && item.movies.length > 0 ? (
                                item.movies.map((movie) => (
                                    <Text key={movie.id} style={styles.movie}>
                                        • {movie.title}
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.noMovies}>Sem filmes </Text>
                            )}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noData}>Sem listas disponíveis</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ffffd7',

    },
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#66666666',
        borderRadius: 5,
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    itemMovies: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    movie: {
        fontSize: 14,
        marginLeft: 10,
    },
    noMovies: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777',
    },
    noData: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#777',
    },
});
