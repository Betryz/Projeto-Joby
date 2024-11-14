import { View, Text, StyleSheet, TouchableOpacity , Image} from 'react-native'
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';




export default function CardMovie({ id, title, poster_path, sinopse, release_date}) {

    const router = useRouter()

    const handlePress = () => {
        router.push({
            pathname: '/movie-info',
            params: { id },
        });
    };

    const truncatedSinopse = sinopse ? (sinopse.length > 100 ? `${sinopse.slice(0, 100)}...` : sinopse) : 'Sinopse não disponível';


    return (
        <TouchableOpacity onPress={handlePress} >

            <View style={styles.card}>

                    <Image
                        style={styles.logo}
                        source={{ uri: `https://image.tmdb.org/t/p/w200${poster_path}` }}
                       
                    />


                    <View style={styles.content}>

                    <Text style={styles.name}>{title}</Text>

                        <Text style={styles.descrisao}>{truncatedSinopse}</Text>
                        <Text style={styles.descrisao}>{release_date}</Text>
                        
                        <Text style={styles.avaliacao}>3,4 <AntDesign name="star" size={15} color="yellow" /> </Text>

                    </View>

            </View>
            </TouchableOpacity>  
              )
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        flexDirection: 'row',
    },
    logo: {
        width: 150,
        height: 200
    },
    content: {
        gap: 6
    },
    name: {
        fontSize: 14,
        fontWeight: 600,
        maxWidth: '40%',
        flexShrink: 1
    },
    avaliacao: {
        color: '#777777'
    },

    descrisao: {
        color: '#777777',
        width: 120,

    },
    inicio: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})