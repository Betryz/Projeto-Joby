import { View, StyleSheet, Text, TextInput } from 'react-native'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import React, { useState } from 'react';

import { useTableStore } from '../stores/useTableStore'
import { fetchAuth } from '../utils/fetchAuth'



export default function Table() {


    const { addTable } = useTableStore()
    const router = useRouter();




    const [txtDescription, setTxtDescription] = useState('')
    const [txtName, setTxtName] = useState('')




    const handleCreateTable = async () => {
        const table = {
            description: txtDescription,
            name: txtName,
                

        }

        const response = await fetchAuth('http://localhost:5000/table', {
            method: 'POST',
          
            body: JSON.stringify(table)
        })

        if (response.ok) {
            const data = await response.json()
            addTable(data.table)
            setTxtDescription('')
            setTxtName('')
            router.back()
        } else {
            const data = await response.json()
            console.log(data?.error)
        }
        return
    }




   




    return (
        <View style={styles.container}>

<View style={styles.avaliador}>
                    <TextInput style={styles.input} onChangeText={setTxtDescription} value={txtDescription} />
                    <TextInput style={styles.input} onChangeText={setTxtName} value={txtName} />

                    <Button style={styles.Button} onPress={handleCreateTable} >Avaliar</Button>
                </View>



           

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