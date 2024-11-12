import { View, StyleSheet, Text, TextInput } from 'react-native'

import Button from '../components/Button'
import { useRouter } from 'expo-router'
import CardAccount from '../components/card'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from 'react';


export default function ShowPass() {

    const router = useRouter()

    const [showContent, setShowContent] = useState(false);


    const handlePress = () => {
        setShowContent(prevState => !prevState);

    };



    return (
        <View style={styles.container}>


            <CardAccount />


            <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'space-between' }}>
                <Button onPress={handlePress} style={styles.Button} ><AntDesign name="star" size={24} color="black" /></Button>
                <Button style={styles.Button}><MaterialIcons name="format-list-bulleted-add" size={24} color="black" /></Button>
            </View>



            {showContent && (
                <>
                    <TextInput style={styles.input} />
                    <Button style={styles.Button2} >Avaliar</Button>



                </>

            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#d5d5d5',
        flex: 1


    },

    Button2:{
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

    }
})