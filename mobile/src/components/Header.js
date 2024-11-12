import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { useLoginStore } from '../stores/useLoginStore'
import { useState } from 'react';
import { useRouter } from 'expo-router';

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

            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise"
                    value={query} onChangeText={setQuery} 
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View style={styles.user}>

                <Pressable onPress={() => router.push('/update')}>
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
        backgroundColor: '#ACCE91',
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
        width: 50,
        height: 50,
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
        borderWidth: 1.5,
        borderStyle: 'solid',
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5
    },
})