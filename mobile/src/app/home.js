import { StyleSheet, View, ScrollView } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardAccount from '../components/card';
import { useMovieStore } from '../stores/movieStore';
import { useRouter } from 'expo-router';

export default function Home() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

  const router = useRouter();

  const searchMovies = (query) => {
    fetchMovies(query);
  };

  return (
    <View style={styles.container}>
      {/* Conteúdo Rolável */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header onSearch={searchMovies} />

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {movies.length > 0 ? (
          movies.map((movie) => (
            <CardAccount
              key={movie.id}
              id={movie.id}
              title={movie.title}
              sinopse={movie.overview}
              poster_path={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              release_date={movie.release_date}
            />
          ))
        ) : (
          <CardAccount
            service="Nenhum resultado encontrado"
            userName="Por favor, tente outro título."
            imgUrl="https://via.placeholder.com/200"
          />
        )}
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5',
  },
  scrollContent: {
    paddingBottom: 60, // Espaço para evitar sobreposição com o Footer
  },
 
});
