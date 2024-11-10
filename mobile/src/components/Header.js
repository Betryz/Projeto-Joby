import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Image } from 'expo-image'



import { useLoginStore } from '../stores/useLoginStore'

export default function Header() {

    const { avatar } = useLoginStore()
    return (
        <View style={styles.header}>

            <View >
              

            </View>




            <View >
                <TextInput
                    style={styles.input}
                    placeholder="Pesquise"

                />
                  </View>

                <View style={styles.user}>
                    <Image
                        style={styles.avatar}
                        source={avatar} />

                </View>

          

          
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        //backgroundColor: "#899986",
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
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#444444',
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginVertical: 5,
        borderRadius: 5
    },
})