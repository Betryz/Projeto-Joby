import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native'
import { Image } from 'expo-image'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'
import { useLoginStore } from '../stores/useLoginStore'

export default function Header() {

    const router = useRouter()


    const { avatar, name } = useLoginStore()
    return (
        <View style={styles.header}>



            <View style={styles.logo} >
            <MaterialCommunityIcons name="movie-open-star-outline" size={30} color="black" />
            <Text style={styles.marca} >
                Jooby
            </Text>
              

            </View>




            <View >
                <TextInput
                    style={styles.input}
                    Image={<FontAwesome name="search" size={24} color="black" />}
                    placeholder="Pesquise"
                    

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
       
        backgroundColor: '#d5d5d5',
        paddingVertical: 6,
        paddingHorizontal: 6,
        marginVertical: 5,
        borderRadius: 5
    },
    marca: {
        fontWeight: 600,
        fontSize: 12,

    }
    

})