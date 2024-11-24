import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from "react";
import Button from '../components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useReviewsStore } from '../stores/useReviewsStore';
import { fetchAuth } from '../utils/fetchAuth';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function UpdateReview() {
    const { reviu, updateReviews } = useReviewsStore();
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const review = reviu.find((item) => item.id === +id);




    const [txtComment, setTxtComment] = useState(review?.comment || '');
    const [txtRating, setTxtRating] = useState(review?.rating?.toString() || '0');


    const onPressIncrementRating = () => {
        const currentRating = parseInt(txtRating, 10);
        if (!isNaN(currentRating) && currentRating < 5) {
            setTxtRating((currentRating + 1).toString());
        } else if (isNaN(currentRating)) {
            setTxtRating('1');
        }
    };


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
        <ScrollView style={styles.container}>
            <Text style={styles.text}> Comentário:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTxtComment}
                value={txtComment}
                placeholder="Digite o comentário..."
                placeholderTextColor="#DDDDDD"
            />
            <Text style={styles.text}>Nota:</Text>



            <View style={styles.countContainer}>
                <Text onChangeText={setTxtRating} style={styles.numeric} keyboardType="numeric">
                    {txtRating}
                </Text>

                <TouchableOpacity onPress={onPressIncrementRating} >
                    <Text style={styles.buttonText}> <AntDesign style={styles.icon} name="pluscircleo" size={24} color="black" /> </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.Button}> 
                <Button onPress={handleUpdateReview}>Atualizar</Button>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#ffffd7',
        flex: 1

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
    countContainer: {
        flexDirection: 'row',

        borderWidth: 1,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderColor: '#444444',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,


    },
    numeric: {
        fontSize: 18
    },
    synopsis: {
        textAlign: 'justify'
    },

    Button: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#ebce73',
        paddingHorizontal: 100,
        borderRadius: 10,
        marginTop: 30

    },
    text: {
        fontWeight: 700
    }
});
