import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
          <View style={styles.logo} >
          <MaterialCommunityIcons name="movie-open-star-outline" size={30} color="black" />
          <Text style={styles.marca} >
              Jooby
          </Text>
            

          </View>
          
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
  

  },
  logo: {
    paddingHorizontal: 10
  },
  marca: {
    fontWeight: 600,
    fontSize: 12,

}
})
