import { ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardAccount from '../components/card'
import { useState } from 'react'

export default function Home() {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/movies/search/${query}`)
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error)
    }
  }

  return (
    <ScrollView style={styles.container}>

      <Header onSearch={searchMovies} />

      {movies.length > 0 ? (
        movies.map((movie) => (
          <CardAccount
            key={movie.id}
            id={movie.id}
            service={movie.title}
            userName={movie.overview}
            imgUrl={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          />
        ))
      ) : (
        <CardAccount />
      )}

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5'

  }
})