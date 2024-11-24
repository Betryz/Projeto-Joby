
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { useLoginStore } from '../stores/useLoginStore'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router'
import { deleteObjectData } from '../utils/asyncStorage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';


export default function Home() {

  const { logout: logoutStore, accessToken } = useLoginStore();
  const router = useRouter();

  const handleLogout = async () => {
    const logout = {
      accessToken,
    };

    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logout),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      logoutStore();
      await deleteObjectData('userLogged');
      router.replace('/login');
    } else {
      const data = await response.json();
      Alert.alert('Erro ao logar');
      console.log(data?.error);
    }
    return;
  };

  const { avatar, name } = useLoginStore()

  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.cabe}>
          <Image
            source={avatar} style={styles.avatar} />
          <Text style={styles.text}> {name}</Text>

        </View>

        <View style={styles.divisor} />

        <Link href="/create-watchlist" style={styles.link}>
          Crie sua própria lista de filmes 
          <AntDesign style={styles.icon} name="pluscircleo" size={24} color="black" />
        </Link>

      </ScrollView>
      <View style={styles.footerText}>
      <Text style={styles.textf}>
      Sair
      </Text>
        
        <FontAwesome5
          style={styles.icon}
          onPress={handleLogout}
          name="door-open"
          size={24}
          color="black"
        />
      </View>

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffd7',

  },
  input: {
    display: 'none'
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  text: {
    color: 'black',
    fontSize: 20,
    paddingVertical: 13,
    paddingHorizontal: 5,
    fontWeight: 600
  },
  cabe: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  select: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '1rem'
  },
  content: {
    marginTop: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    borderRadius: 10,
    alignItems: 'center',
    margin: 50
  },
  logo: {
    width: 40,
    height: 40
  },
  service: {
    fontSize: 17,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    paddingVertical: 1
  },
  comment: {
    color: '#777777',
    marginLeft: 'auto',
  },
  scrollContent: {
    paddingBottom: 60,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ebce73',

  },
  icon: {
    paddingHorizontal: 8, 
  },
  divisor: {
    display: 'flex',
    alignItems: 'center',
    borderBottomColor: '#555555',
    borderBottomWidth: 1
    },
  link: {
    fontSize: 17,
    margin: 10,
    fontWeight: 500
  },
  textf: {
    fontSize: 18,
    fontWeight: 700
  }
})