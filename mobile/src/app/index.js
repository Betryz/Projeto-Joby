import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import Footer from '../components/Footer'
import { useRouter } from 'expo-router'
import { getObjectData } from '../utils/asyncStorage'
import { useLoginStore } from '../stores/useLoginStore'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Init() {
  const router = useRouter()
  const { login } = useLoginStore()

  useEffect(() => {
    const checkUserLogged = async () => {
      const userLogged = await getObjectData('userLogged')
      if(userLogged){
        login(userLogged)
        router.replace('/home')
      } else {
        router.replace('/login')
      }
    }
    
    setTimeout(checkUserLogged, 3000)
  },[])

  return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialIcons  name="connected-tv" size={40} color="#000"  />

        
          <Text style={styles.text}>Joby</Text>

          <Text style={styles.textinho} >Avalie os filmes do catálogo </Text>
          <ActivityIndicator style={{marginVertical: 30}} />
        </View>
        
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5'
  },
  text: {
    fontSize: 30,
    fontWeight: 600,
    color: '#000'
   },
   textinho:{
    color: '#000',
    width: 200,
    textAlign: 'center'
   }
})