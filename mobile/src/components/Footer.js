import {View, Text, StyleSheet, Alert} from 'react-native'
import { useLoginStore } from '../stores/useLoginStore'
import { useRouter } from 'expo-router'
import { deleteObjectData } from '../utils/asyncStorage'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Footer(){

    const { logout: logoutStore, accessToken } = useLoginStore()
    const router = useRouter()

    const handleLogout = async () => {
        const logout = {
            accessToken 
        }
    
        const response = await fetch('http://localhost:5000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(logout)
        })
    
        if(response.ok){
            const data = await response.json()
            console.log(data)
            logoutStore()
            await deleteObjectData('userLogged')
            router.replace('/login')
        } else {
            const data = await response.json()
            Alert.alert('Erro ao logar')
            console.log(data?.error)
        }
        return
    }

    return (
        <View style={styles.footer}>
          <Text style={styles.copy}>Copyright © 2024 Renan Cavichi </Text>
          
            <FontAwesome5 style={styles.saida} onPress={handleLogout} name="door-open" size={24} color="black" />
          
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        padding: 25,
        //backgroundColor: "#998560",
        justifyContent: 'center',
        alignItems: 'center',
    },
    copy: {
        color: "#555555"
    }
   
})