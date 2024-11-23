import { ScrollView, StyleSheet, View, Text, TextInput, Alert } from 'react-native'
import Button from '../components/Button'
import { useRouter } from 'expo-router'
import {useState} from 'react'
import { useLoginStore } from '../stores/useLoginStore'
import { storeObjectData } from '../utils/asyncStorage'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login() {
  const router = useRouter()

  const {login: loginStore} = useLoginStore()

  const [txtEmail, setTxtEmail] = useState('')
  const [txtPass, setTxtPass] = useState('')

  const handleLogin = async () => {
    const login = {
        email: txtEmail,
        pass: txtPass
    }

    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })

    if(response.ok){
        const data = await response.json()
        console.log(data)
        loginStore({accessToken: data?.accessToken, ...data.user})
        await storeObjectData('userLogged', {accessToken: data?.accessToken, ...data.user})
        router.push('/home')
    } else {
        const data = await response.json()
        Alert.alert('Erro ao logar')
        console.log(data?.error)
    }
    return
}

  return (
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, marginTop: 40, justifyContent: 'center', alignItems: 'center'}}>


         <View  style={styles.login}>
         <FontAwesome  name="sign-in" size={40} color="black" />
        <Text style={styles.text} >
          Login
        </Text>   
          
          </View> 
       


          <TextInput 
            style={styles.input}
            onChangeText={setTxtEmail}
            value={txtEmail} placeholder='Digite seu email...' placeholderTextColor='#555555'
          />
          
          <TextInput 
            style={styles.input}
            onChangeText={setTxtPass}
            value={txtPass}
            secureTextEntry={true} placeholder='Digite sua senha...' placeholderTextColor='#555555'
          />
          <Button onPress={handleLogin}>Entrar</Button>
        
          <View style={styles.divisor}/>

          <Button onPress={() => router.push('/signup')}>Cadastre-se</Button>
        </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffd7',

  },
  text: {
color: '#000',
fontSize: 20,
fontWeight: 600,
padding: 5

},
login:{
  marginVertical: 60,
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row'


},
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginVertical: 10,
    borderRadius: 5,
    color: 'black',
    width: "85%"
  },
  divisor: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 40,
  }
})