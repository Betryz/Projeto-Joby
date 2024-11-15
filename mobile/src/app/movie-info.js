import { View, StyleSheet, Text, TextInput } from 'react-native'
import { Image } from 'react-native'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams  } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { useMovieStore } from '../stores/movieStore';
import { useReviewsStore } from '../stores/useReviewsStore'
import { fetchAuth } from '../utils/fetchAuth'
import { useWatchlistStore } from '../stores/useFavoriteStore'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function ShowPass() {


    const { addReviews } = useReviewsStore()
    const {addWatchlist} = useWatchlistStore()
    const { id } = useLocalSearchParams();
    const { movies, getMovieById } = useMovieStore();
    const movie = movies.find((m) => m.id === parseInt(id));
    const router = useRouter();

    if (!movie) return <Text>Carregando...</Text>;

    const [showContent, setShowContent] = useState(false);


    const handlePress = () => {
        setShowContent(prevState => !prevState);

    };


    const [txtComment, setTxtComment] = useState('')
    const [txtRating, setTxtRating] = useState('')




    const handleCreateReviews = async () => {
        const review = {
            comment: txtComment,
            rating: parseInt(txtRating, 10),
            movieId: movie.id            

        }

        const response = await fetchAuth('http://localhost:5000/avalia', {
            method: 'POST',
          
            body: JSON.stringify(review)
        })

        if (response.ok) {
            const data = await response.json()
            addReviews(data.review)
            setTxtComment('')
            setTxtRating('')
            router.back()
        } else {
            const data = await response.json()
            console.log(data?.error)
        }
        return
    }




    const [txtWatched , setTxtWatched ] = useState('')


    const handleCreateWatchlist = async () => {
        const watchlist = {
            watched: txtWatched.toLowerCase() === 'true', 
            movie_id: movie.id            

        }

        const response = await fetchAuth('http://localhost:5000/watch', {
            method: 'POST',
          
            body: JSON.stringify(watchlist)
        })

        if (response.ok) {
            const data = await response.json()
            addWatchlist(data.watchlist)
            setTxtWatched ('')
            router.back()
        } else {
            const data = await response.json()
            console.log(data?.error)
        }
        return
    }




    return (
        <View style={styles.container}>

            <View style={styles.container}>
                <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path || ""}` }}
                    style={styles.poster}
                />
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.releaseDate}>{movie.release_date || "Data não disponível"}</Text>
                <Text style={styles.synopsis}>{movie.sinopse || "Sinopse não disponível"}</Text>
            </View>

            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button} onPress={handleCreateWatchlist}><MaterialCommunityIcons name="movie-open-plus-outline" size={24} color="black" /></Button>
            </View>



            {showContent && (
                <View style={styles.avaliador}>
                    <TextInput style={styles.input} onChangeText={setTxtComment} value={txtComment} />
                    <TextInput style={styles.input} onChangeText={setTxtRating} value={txtRating} />

                    <Button style={styles.Button} onPress={handleCreateReviews} >Avaliar</Button>
                </View>

            )}

        </View>
    )
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
        borderStyle: 'solid',
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5,

    },
    avaliador: {
        paddingHorizontal: 20
    }
})