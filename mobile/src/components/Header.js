import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLoginStore } from '../stores/useLoginStore'
import { useState } from 'react';

export default function Header({ onSearch }) {

    const router = useRouter()
    const { avatar, name } = useLoginStore()

    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query) {
            onSearch(query);
        }
    }

    return (
        <View style={styles.header}>



            <View style={styles.logo} >
                <MaterialCommunityIcons name="movie-open-star-outline" size={30} color="black" />
                <Text style={styles.marca} >
                    Jooby
                </Text>


            </View>



            <View style={styles.barra} >
                <TextInput
                    style={styles.input}  
                    Image={<FontAwesome name="search" size={24} color="black" />}
                    placeholder="Pesquise"
                    value={query} onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                />

                <Ionicons name="search-sharp" size={24} color="black" />
            </View>

            <View style={styles.user}>

                <Pressable onPress={() => router.push('/user-info')}>
                    <Image
                        style={styles.avatar}
                        source={avatar} />
                </Pressable>

            </View>

        </View>








    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#ebce73',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25
    },
    name: {
        fontWeight: '600',
        fontSize: 18
    },
    menu: {
        padding: 10
    },
    input: {
        backgroundColor: '#ffffd7',
        borderBlockColor:'#ffffd7' ,
        paddingVertical: 6,
        paddingHorizontal: 6,
     
    },
    marca: {
        fontWeight: 600,
        fontSize: 12,

    },
    barra: {
        flexDirection: 'row',
        backgroundColor: '#ffffd7',

        borderRadius: 5,
        padding: 4,
        marginHorizontal: 12


        
    }


})