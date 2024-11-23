
import { View, StyleSheet, Alert } from 'react-native';
import { useLoginStore } from '../stores/useLoginStore';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Fontisto from '@expo/vector-icons/Fontisto';

export default function Footer() {
  const router = useRouter();



  return (
    <View style={styles.footer}>

      <AntDesign name="star" onPress={() => router.push('/reviews')} size={36} color="black" />
      <MaterialCommunityIcons onPress={() => router.push('/tables')} name="table-eye" size={36} color="black" />
      <Fontisto onPress={() => router.push('/favorite')} name="favorite" size={24} color="black" />

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#ebce73',

    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '4rem'
  },


});
