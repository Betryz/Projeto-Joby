import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import Button from '../components/Button';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CardMovie from '../components/card';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';

export default function MovieInfo() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [movie, setMovie] = useState(''); 
    const [showContent, setShowContent] = useState(false);
    const [txtComent, setTxtComent] = useState('');
    const [txtRating, setTxtRating] = useState('');

    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/movies/movie-info/${id}`);
                const data = await response.json();
                console.log('Dados do filme:', data);
                setMovie(data); 
            } catch (error) {
                console.error('Erro ao buscar dados do filme:', error.message);
            }
        };

        // if (id) 
        fetchMovieData();
    }, [id]);

    const handlePress = () => {
        setShowContent(prevState => !prevState);
    };

    const handleCreateReviews = async () => {
        const review = {
            coment: txtComent,
            rating: txtRating
           
        }
    
        const response = await fetch('http://localhost:5000/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(review)
        })

        if(response.ok){
            const data = await response.json()
            Alert.alert('Avaliação Criada com Sucesso!')
            setTxtComent('')
            setTxtRating('')
            router.back()
        } else {
            Alert.alert('Erro ao Criar a avaliação');
            console.error('Erro ao criar avaliação');
        }
    };

    if (!movie) {
        return <Text>Carregando...</Text>; 
    }

    return (
        <View style={styles.container}>
            <CardMovie
                id={id}
                title={movie.title}
                poster_path={movie.poster_path}
                sinopse={movie.sinopse}
                release_date={movie.release_date}
            />

            <View style={{ flexDirection: 'row',  paddingHorizontal: 15, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button}><MaterialCommunityIcons name="movie-open-plus-outline" size={24} color="black" /></Button>
            </View>

            {showContent && (
                <View style={styles.avaliador}>
                    <TextInput style={styles.input}  onChangeText={setTxtComent} value={txtComent} />
                    
                    <Button style={styles.Button} onPress={handleCreateReviews} >Avaliar</Button>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d5d5d5',
        flex: 1
    },
    Button: {
        display: 'flex'
    },
    card: {
        padding: 10,
        flexDirection: 'row',
        gap: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    logo: {
        width: 60,
        height: 60
    },
    content: {
        gap: 6
    },
    service: {
        fontSize: 17
    },
    username: {
        color: '#777777'
    },
    input: {
        borderWidth: 1,
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5
    },
    avaliador: {
        paddingHorizontal: 20
    }
});
