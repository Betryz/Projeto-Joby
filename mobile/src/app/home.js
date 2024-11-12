 import { ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardAccount from '../components/card'
import { useState } from 'react'

export default function Home() {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/movies/search/${query}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MjhlNWExMjBhMTM1ZGYxMGMxNzczODlhODQ4MTczNiIsIm5iZiI6MTczMTQzMjY1OS4wMjk4ODI3LCJzdWIiOiI2NzJkMGViMmViZTIxZGVmMDhjOGRjNTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.mChbJJ8m8CrsNzRXymoUoy83IdhEpjc9mPVa6WI1loQ'
        }
      })
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
            title={movie.title}
            sinopse={movie.overview}
            poster_path={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          />
        ))
      ) : (
        <CardAccount
          service="Nenhum resultado encontrado"
          userName="Por favor, tente outro título."
          imgUrl="https://via.placeholder.com/200"
        />
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