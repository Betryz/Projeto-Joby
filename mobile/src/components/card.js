import {View, Text, StyleSheet, Pressable} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';




export default function CardAccount ({ id, service, userName, imgUrl }) {

    const router = useRouter()

    return (
        <Pressable onPress={() => router.push({pathname: '/show-pass', params: {id}})}>
            <View style={styles.card}>
                
                <Image 
                    style={styles.logo} 
                    source={{ uri: 'https://avatars.githubusercontent.com/u/9919?s=200&v=4' }} 

                />
                
                <View style={styles.content}>
                    <Text style={styles.name}>Pobres criaturas</Text>
                    <Text style={styles.descrisao}>

"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Nulla vitae elit libero."</Text>
                    <Text style={styles.avaliacao}>3,4 <AntDesign name="star" size={15} color="yellow" /> </Text>



                    
                </View>
            </View>
        </Pressable>
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
        flexDirection: 'row',
        gap: 15,
        marginVertical:50,
        marginHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    logo:{
        width: 90,
        height: 120
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