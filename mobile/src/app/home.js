 import { ScrollView, StyleSheet } from 'react-native'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardAccount from '../components/card'
import { useMovieStore } from '../stores/movieStore';


export default function Home() {
  const { movies, loading, error, fetchMovies } = useMovieStore();

    const searchMovies = (query) => {
        fetchMovies(query);
    };

    return (
        <ScrollView style={styles.container}>
            <Header onSearch={searchMovies} />

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {movies.length > 0 ? (
                movies.map((movie) => (
                    <CardAccount
                        key={movie.id}
                        id={movie.id}
                        title={movie.title || "Título não disponível"}
                        sinopse={movie.sinopse || "Sinopse não disponível"}
                        poster_path={`https://image.tmdb.org/t/p/w200${movie.poster_path || ""}`}
                        release_date={movie.release_date || "Data não disponível"}
                    />
                ))
            ) : (
                !loading && (
                    <CardAccount
                        service="Nenhum resultado encontrado"
                        userName="Por favor, tente outro título."
                        imgUrl="https://via.placeholder.com/200"
                    />
                )
            )}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d5d5d5'

  }
})