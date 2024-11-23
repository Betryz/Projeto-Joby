import { View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import Button from '../components/Button'
import { useRouter, useLocalSearchParams } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';
import { useMovieStore } from '../stores/movieStore';
import { useReviewsStore } from '../stores/useReviewsStore'
import { fetchAuth } from '../utils/fetchAuth'
import { useWatchlistStore } from '../stores/useFavoriteStore'


import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function ShowPass() {





    const { addReviews } = useReviewsStore()
    const { addWatchlist } = useWatchlistStore()
    const { id } = useLocalSearchParams();
    const { movies } = useMovieStore();
    const movie = movies.find((m) => m.id === parseInt(id));
    const router = useRouter();

    if (!movie) return <Text>Carregando...</Text>;

    const [showContent, setShowContent] = useState(false);

    const handlePress = () => {
        setShowContent(prevState => !prevState);

    };

    const [txtComment, setTxtComment] = useState('')
    const [txtRating, setTxtRating] = useState(0)


    const onPressIncrementRating = () => {
        const currentRating = parseInt(txtRating, 10);
        if (!isNaN(currentRating) && currentRating < 5) {
            setTxtRating((currentRating + 1).toString());
        } else if (isNaN(currentRating)) {
            setTxtRating('1');
        }
    };


    const handleCreateReviews = async () => {
        const review = {
            comment: txtComment,
            rating: parseInt(txtRating, 10),
            movieId: movie.id

        }

        const response = await fetchAuth('http://localhost:5000/reviews', {
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




    const [txtWatched, setTxtWatched] = useState('')


    const handleCreateWatchlist = async () => {
        const watchlist = {
            watched: txtWatched.toLowerCase() === 'true',
            movie_id: movie.id

        }

        const response = await fetchAuth('http://localhost:5000/favorites', {
            method: 'POST',

            body: JSON.stringify(watchlist)
        })

        if (response.ok) {
            const data = await response.json()
            addWatchlist(data.watchlist)
            setTxtWatched('')
            router.back()
        } else {
            const data = await response.json()
            console.log(data?.error)
        }
        return
    }



    return (
        <ScrollView style={styles.container}>

            <View style={styles.card}>

            <Text style={styles.title}>{movie.title}</Text>
                <Image
                    style={styles.logo}
                    source={{ uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}` }}

                />

                
              
                <Text style={styles.synopsis}>{movie.sinopse || "Sinopse não disponível"}</Text>


                <Text style={styles.releaseDate}>{movie.release_date || "Data não disponível"}</Text>
            </View>

            

            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button} onPress={handleCreateWatchlist}><MaterialCommunityIcons name="movie-open-plus-outline" size={24} color="black" /></Button>
            </View>

            {showContent && (
                <View style={styles.avaliador}>








                    <View style={styles.countContainer}>
                        <Text onChangeText={setTxtRating} style={styles.numeric}  keyboardType="numeric">
                            {txtRating}
                        </Text>

                        <TouchableOpacity onPress={onPressIncrementRating} >
                            <Text style={styles.buttonText}> <AntDesign style={styles.icon} name="pluscircleo" size={24} color="black" /> </Text>
                        </TouchableOpacity>
                    </View>


                    <TextInput style={styles.input}  placeholder='Digite seu comentário...' onChangeText={setTxtComment} value={txtComment} />



                    <Button style={styles.Button} onPress={handleCreateReviews} >Avaliar</Button>
                </View>

            )}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffd7',
        flex: 1
    },
    Button: {
        display: 'flex'
    },
    card: {
        padding: 10,
        borderStyle: 'solid',
        borderColor: '#66666666',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        gap: 15,
        marginVertical: 50,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'column'
    },
    logo: {
        maxWidthwidth: 200,
        height: 380,
        justifyContent:'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        maxWidth: '100%',
        flexShrink: 1,
        textAlign: 'center',
        
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
        textAlign:'justify'
    }
})