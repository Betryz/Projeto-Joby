import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'

export default function CardMovie({ tmdb_id, title, poster_path, sinopse, release_date }) {

    const router = useRouter()

    const truncatedSinopse = sinopse ? (sinopse.length > 150 ? `${sinopse.slice(0, 100)}...` : sinopse) : 'Sinopse não disponível';


    return (
        <Pressable onPress={() => router.push({ pathname: '/show-pass', params: { tmdb_id } })}>
            <View style={styles.card}>

                <Image
                    style={styles.logo}
                    source={{ uri: poster_path }}
                    defaultSource={{ uri: 'https://via.placeholder.com/100x120' }} 
                />

                <View style={styles.content}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.descrisao}>{truncatedSinopse}</Text>
                    <Text style={styles.descrisao}>{release_date}</Text>
    
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 10,
        borderStyle: 'solid',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        flexDirection: 'row',
        gap: 15,
        marginVertical: 50,
        borderRadius: 10,
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 200
    },
    content: {
        gap: 6
    },
    name: {
        fontSize: 17,
        fontWeight: 600
    },
    avaliacao: {
        color: '#777777'
    },

    descrisao: {
        color: '#777777',
        width: 180,
        textAlign: 'justify'
    }
})