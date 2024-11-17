import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Footer from '../components/Footer'
import { useLoginStore } from '../stores/useLoginStore'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useReviewsStore } from '../stores/useReviewsStore';
import { fetchAuth } from '../utils/fetchAuth'
import CardMovie from '../components/card';
import { useRouter } from 'expo-router'


export default function Home() {

    const router = useRouter()
    






    const [showContent, setShowContent] = useState(false);
    const [showContentList, setShowContentList] = useState(false);

    const { avatar, name } = useLoginStore()

    const handlePress = () => {
        setShowContent(prevState => !prevState);
        setShowContentList(false);
    };

    const handlePressList = () => {
        setShowContentList(prevState => !prevState);
        setShowContent(false);
    };

    const { reviews, setReviews } = useReviewsStore()

    console.log('reviews: ', reviews)

    useEffect(() => {
        const getReviews = async () => {
            const response = await fetchAuth('http://localhost:5000/avalia')
            if (response.ok) {
                const data = await response.json()
                console.log(data.reviews)
                setReviews(data.reviews)
                return
            }
            console.log('Erro ao carregar reviews')
            return
        }

        getReviews()
    }, [])


    return (
        <ScrollView style={styles.container}>

            <View style={styles.cabe}>
                <Image
                    source={avatar} style={styles.avatar} />
                <Text style={styles.text}> {name}</Text>


                <Button onPress={() => router.push('/table')}>Lista</Button>


            </View>

            <View style={styles.select}>

                <Button onPress={handlePress}>
                    Avaliações
                </Button>

                <Button onPress={handlePressList}>
                    Favoritos
                </Button>

            </View>

            <View style={styles.card}>

                {
                    reviews.map((review) =>
                        <CardMovie
                            key={reviews.id}
                            id={reviews.movie.id}
                            comment={reviews.comment}
                            rating={reviews.rating}
                            style={styles.card}
                        />
                    )
                }
            </View>

            {showContentList && (
                <View style={styles.card}>
                    <Image
                        style={styles.logo}
                    />
                    <Text style={styles.service}>oi</Text>
                    <Text style={styles.comment}>fgdgdddddddd</Text>
                    <EvilIcons name="arrow-right" size={26} color="black" />
                </View>
            )}

            <Footer />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d5d5d5'


    },
    input: {
        display: 'none'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {

        color: 'black',
        fontSize: 20,
        paddingVertical: 13,
        paddingHorizontal: 5,
        fontWeight: 600
    },
    cabe: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
    },
    select: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '1rem'
    },
    content: {
        marginTop: 20,
        backgroundColor: '#ecf0f1',
        borderRadius: 5,
    },
    card: {
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        borderRadius: 10,
        alignItems: 'center',
        margin: 50
    },
    logo: {
        width: 40,
        height: 40
    },
    service: {
        fontSize: 17,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#EEEEEE',
        paddingVertical: 1
    },
    comment: {
        color: '#777777',
        marginLeft: 'auto',
    }
})