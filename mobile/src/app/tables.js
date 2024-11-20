import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useTableStore } from '../stores/useTableStore';
import { useEffect } from 'react';
import { fetchAuth } from '../utils/fetchAuth';

export default function Home() {
    const { tablet, setTable } = useTableStore();

    useEffect(() => {
        const getTables = async () => {
            try {
                const response = await fetchAuth('http://localhost:5000/table');

                if (response.ok) {
                    const data = await response.json();

                    if (data && data.table) {
                        setTable(data.table);
                    }
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
                <Text style={styles.titulo}>Lista de Filmes</Text>

                {Array.isArray(tablet) && tablet.length > 0 ? (
                    tablet.map((tableItem) => (
                        <View key={tableItem.id} style={styles.tableContainer}>

                            <Text style={styles.tableName}>{tableItem.name}</Text>

                            <Text style={styles.tableDescription}>Descrição: {tableItem.description}</Text>
                            <View style={styles.divisor} />



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

                                        <Text style={styles.movieText}>Título: {movie.title}</Text>
                                           
                                            
                                            <Text style={styles.watchedText}>
                                                Data de Lançamento: {new Date(movie.release_date).toLocaleDateString()}
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
        backgroundColor: '#d5d5d5',
    },
    titulo: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        paddingVertical: 25
        
    },
    tableContainer: {
        marginBottom: 20,
        borderRadius: 5,
        marginHorizontal: 10,
        borderStyle: 'solid',
        borderColor: '#66666666',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,

        
    },
    tableName: {
        fontSize: 18,
        marginBottom: 5,
        backgroundColor: '#ACCE91',
        textAlign: 'center'
        
    },
    tableDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    watchlistItem: {
        padding: 10,
        gap: 15,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'

    },
    movieText: {
        fontSize: 14,
        marginTop: 10,
        width: 150
    },
    watchedText: {
        fontSize: 10,
        color: '#555',
        marginTop: 4,
        
        textAlign: 'justify'
    },
    movieImage: {
        width:100,
        height: 130,
        borderRadius: 8,
    },
    emptyMessage: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        color: '#888',
    },
    divisor: {
        borderBottomColor: '#66666666',
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 10,
    },
});
