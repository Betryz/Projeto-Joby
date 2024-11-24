import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useTableStore } from '../stores/useTableStore';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import Button from '../components/Button';
import Ionicons from '@expo/vector-icons/Ionicons';




export default function Home() {
    const { tablet, setTable } = useTableStore();
    const [loading, setLoading] = useState(true);

    const handleDeleteTable = async (tableId) => {
        console.log(`Tentando excluir a tabela com ID: ${tableId}`);

        const response = await fetchAuth(`http://localhost:5000/watchlist/${tableId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Tabela com ID ${tableId} excluída com sucesso.`);
            setTable((prevTables) => prevTables.filter((tableItem) => tableItem.id !== tableId));
            return;
        }

        const errorData = await response.json();
        console.error('Erro ao excluir a tabela:', errorData);
    };

    useEffect(() => {
        const getTables = async () => {
            try {
                setLoading(true);
                const response = await fetchAuth('http://localhost:5000/watchlist');

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.watchlist) {
                        setTable(data.watchlist);
                    }
                }
            } catch (error) {
                console.error('Erro ao realizar o fetch:', error);
            } finally {
                setLoading(false);
            }
        };

        getTables();
    }, [setTable]);

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
                {Array.isArray(tablet) && tablet.length > 0 ? (
                    tablet.map((tableItem) => (
                        <View key={tableItem.id} style={styles.tableContainer}>


                        <View  style={styles.info}>
                        <View >
                                <Text style={styles.tableName}>Nome: {tableItem.name}</Text>
                                <Text style={styles.tableDescription}>Descrição: {tableItem.description}</Text>

                            </View>


                            <Ionicons
                                style={styles.trashIcon}
                                onPress={() => handleDeleteTable(tableItem.id)}
                                name="trash-bin"
                                size={24}
                                color="black"
                            />
                        </View>
                            


                            {tableItem.movies && tableItem.movies.length > 0 && (
                                tableItem.movies.map((movie) => (
                                    <View key={movie.id} style={styles.watchlistItem}>
                                        {movie.poster_path && (
                                            <Image
                                                source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}
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
                                ))
                            )}





                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Nenhuma tabela ou filme disponível.</Text>
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
        justifyContent: 'space-between'
      

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
    tableContainer: {
        marginBottom: 20,
        padding: 7,
        borderRadius: 5,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    tableName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    tableDescription: {
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
        textAlign: 'center'

    },
    watchedText: {
        fontSize: 10,
        color: '#555',
        marginTop: 5,
        maxWidth: 140
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
