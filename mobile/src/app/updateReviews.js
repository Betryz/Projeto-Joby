import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from "react";
import Button from '../components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useReviewsStore } from '../stores/useReviewsStore';
import { fetchAuth } from '../utils/fetchAuth';

export default function UpdateReview() {
    const { reviu, updateReviews } = useReviewsStore();
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const review = reviu.find((item) => item.id === +id);

    const [txtComment, setTxtComment] = useState(review?.comment || '');
    const [txtRating, setTxtRating] = useState(review?.rating?.toString() || '0');

    const handleUpdateReview = async () => {
        const updatedReview = {
            comment: txtComment,
            rating: +txtRating,
        };

        const response = await fetchAuth(`http://localhost:5000/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedReview),
        });

        if (response.ok) {
            const data = await response.json();
            updateReviews(data.review); 
            router.back(); 
            return;
        }

        const errorData = await response.json();
        console.error('Erro ao atualizar a avaliação:', errorData);
    };

    return (
        <View style={styles.container}>
            <Text>Comentário:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtComment}
                value={txtComment}
                placeholder="Digite o comentário..."
                placeholderTextColor="#DDDDDD"
            />
            <Text>Nota:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtRating}
                value={txtRating}
                keyboardType="numeric"
                placeholder="Digite a nota (0-5)"
                placeholderTextColor="#DDDDDD"
            />
            <Button onPress={handleUpdateReview}>Atualizar</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5,
    },
});
