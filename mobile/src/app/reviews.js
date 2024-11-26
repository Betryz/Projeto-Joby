import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import { useReviewsStore } from '../stores/useReviewsStore';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Reviews() {

    const { setReviews } = useReviewsStore();
    const [reviews, setLocalReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const router = useRouter();
    const handleDelete = async (reviewId) => {
        console.log(`Tentando excluir a avaliação com ID: ${reviewId}`);

        const response = await fetchAuth(`http://localhost:5000/reviews/${reviewId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Avaliação com ID ${reviewId} excluída com sucesso.`);
            setLocalReviews((prevReviews) =>
                prevReviews.filter((review) => review.id !== reviewId)
            );
            return;
        }

        const errorData = await response.json();
        console.error('Erro ao excluir a avaliação:', errorData);
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetchAuth('http://localhost:5000/reviews');

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
                        setLocalReviews(reviewsData.filter((item) => item.movie !== null));
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

                                <Text style={styles.movieTitle}> {review.movie?.title || 'Desconhecido'}</Text>
                                <Text style={styles.reviewText}>Comentário: {review.comment}</Text>
                                <Text style={styles.ratingText}>Nota: {review.rating}/5</Text>
                                <Button style={styles.botton} onPress={() => router.push({ pathname: '/update-reviews', params: { id: review.id } })}>Editar</Button>

                            </View>
                            
                            <Ionicons style={styles.icon}
                                onPress={() => handleDelete(review.id)}
                                name="trash-bin"
                                size={24}
                                color="black"
                            />
                        </View>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>Nenhuma avaliação encontrada</Text>
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
    reviewItem: {
        padding: 11,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        marginTop: 50,
        height: 200
    },
    reviewDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    movieImage: {
        width: 100,
        height: '100%',
        borderRadius: 8,
    },
    movieTitle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    reviewText: {
        fontSize: 13,
        marginTop: 5,
    },
    ratingText: {
        fontSize: 12,
        color: '#555',
        marginTop: 5,
        paddingBottom: 10
    },

    emptyMessage: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 16,
        color: '#888',
    },
    icon: {
        position: 'relative',
        top: 145,
        height: 20
    }
});
