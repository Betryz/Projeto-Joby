import { View, StyleSheet, Text, TextInput } from 'react-native'

import Button from '../components/Button'
import { useRouter } from 'expo-router'
import CardAccount from '../components/card'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


export default function ShowPass() {

    const router = useRouter()

    const [showContent, setShowContent] = useState(false);


    const handlePress = () => {
        setShowContent(prevState => !prevState);

    };



    return (
        <View style={styles.container}>


            <CardAccount />


            <View style={{ flexDirection: 'row',  paddingHorizontal: 15, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button}><MaterialCommunityIcons name="movie-open-plus-outline" size={24} color="black" /></Button>
            </View>



            {showContent && (
                <View style={styles.avaliador}>
                    <TextInput style={styles.input} />
                    <Button style={styles.Button} >Avaliar</Button>
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