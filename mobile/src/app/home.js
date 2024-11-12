import { ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardAccount from '../components/card'

export default function Home() {
  return (
      <ScrollView style={styles.container}>
        <Header />
        <CardAccount/>
        
        <Footer />
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5'

  }
})