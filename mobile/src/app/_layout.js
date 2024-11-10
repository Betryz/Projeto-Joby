import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
            backgroundColor: "#000"
        },
        headerTintColor: '#000',
        headerStyle: {
          backgroundColor: '#ACCE91', 
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <MaterialIcons style={styles.icon} name="connected-tv" size={30} color="black"  />
          
        ),
      }}> 
  
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="home" options={{headerShown: false}} />
      <Stack.Screen name="login" options={{title: "Entrar"}}/>
      <Stack.Screen name="signup" options={{title: "Cadastre-se"}}/>
      <Stack.Screen name="create-account" options={{title: "Adicionar Conta"}}/>
      <Stack.Screen name="show-pass" options={{title: "Ver Senha"}}/>
      <Stack.Screen name="update" options={{title: "Editar"}}/>
    </Stack>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 20,
  

  }
})
