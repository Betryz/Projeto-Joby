import { ScrollView, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { getObjectData } from '../utils/asyncStorage'
import { useLoginStore } from '../stores/useLoginStore'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
        <View style={{ flex: 1, marginTop: 200, justifyContent: 'center', alignItems: 'center'}}>
        <MaterialCommunityIcons name="movie-open-star-outline" size={40} color="black" />

        
        <Text style={styles.marca} >
              Jooby
          </Text>

          <Text style={styles.textinho} >Avalie seus filmes e faça sua lista de filmes para assistir!</Text>
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
   textinho:{
    color: '#000',
    width: 200,
    textAlign: 'center'
   },
   marca: {
    fontWeight: 600,
    fontSize: 20,

}
})