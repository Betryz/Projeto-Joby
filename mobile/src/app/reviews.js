import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import { useReviewsStore } from '../stores/useReviewsStore';

export default function Reviews() {
    const { setReviews } = useReviewsStore();
    const [reviews, setLocalReviews] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchAuth('http://localhost:5000/avalia'); 
    
                if (response.ok) {
                    const data = await response.json();
    
                    if (data && data.avaliar) { 
                        setReviews(data.avaliar); 
    
                        const reviewDetailsPromises = data.avaliar.map(async (review) => {
                            if (review.movieId) {
                                const movieResponse = await fetchAuth(`http://localhost:5000/movies/movie-info/${review.movieId}`);
                                return movieResponse.ok
                                    ? { ...review, movie: await movieResponse.json() } 
                                    : { ...review, movie: null };
                            }
                            return { ...review, movie: null };
                        });
    
                        const reviewsData = await Promise.all(reviewDetailsPromises);
                        setLocalReviews(reviewsData.filter((item) => item.movie !== null)); // Filtra reviews com filmes válidos
                    }
                } else {
                    console.error('Erro na API:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar reviews:', error);
            }
        };
    
        fetchReviews();
    }, [setReviews]);
    

   

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.titulo}>Lista de Reviews</Text>
                <View style={styles.divisor} />

                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <View key={review.id} style={styles.reviewItem}>
                            {review.movie?.poster_path && (
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w200${review.movie.poster_path}` }}
                                    style={styles.movieImage}
                                    resizeMode="cover"
                                />
                            )}
                            <View style={styles.reviewDetails}>
                                <Text style={styles.movieTitle}>Título: {review.movie?.title || 'Desconhecido'}</Text>
                                <Text style={styles.reviewText}>Comentário: {review.comment}</Text>
                                <Text style={styles.ratingText}>Nota: {review.rating}/5</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Nenhum review encontrado.</Text>
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
    reviewItem: {
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    reviewDetails: {
        flex: 1,
        marginLeft: 10,
    },
    movieImage: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    movieTitle: {
        fontSize: 15,
        fontWeight: '500',
    },
    reviewText: {
        fontSize: 16,
        marginTop: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    emptyMessage: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        color: '#888',
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
});
