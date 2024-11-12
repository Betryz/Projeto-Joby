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
        <> 
      
    
        <View style={styles.footer}>
        <View style={styles.divisor}/>

        <View style={styles.footerText}>
        <Text style={styles.copy}>Copyright © 2024 Renan Cavichi </Text>
          
          <FontAwesome5 style={styles.saida} onPress={handleLogout} name="door-open" size={24} color="black" />
        
        </View>
        
        </View>

        </>
    )
}

const styles = StyleSheet.create({
    footer: {
   
        //backgroundColor: "#998560",
       
        position: 'absolute',
        bottom: -200,
        left: 0,           
        right: 0,
        

    },
    footerText: {
       
       
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        flexDirection: 'row',
        left: 0,           
        right: 0,
        padding: 10
        
       

    },
    copy: {
        color: "#555555"
    },
    divisor: {
        borderBottomColor: '#d4d4d4',
        borderBottomWidth: 1,
        width: '100%',

  
  
        
      }
   
})