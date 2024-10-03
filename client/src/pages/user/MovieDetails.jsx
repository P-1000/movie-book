import React , {useState , useEffect} from 'react'
import { getMovieDetailsByTMDBId  } from '../../services/movieService'
import { useParams } from 'react-router-dom'
import MovieBackdropAndInfo from '../../components/MovieBakcdropAndInfo'
const MovieDetails = (props) => {

    const [movie, setMovie] = useState(null)
    const { id , dbid } = useParams()
    const [loading, setLoading] = useState(true)
    const fetchMovieDetails = async () => {
        setLoading(true); // Set loading before the request
        try {
          const movieData = await getMovieDetailsByTMDBId(id);
          setMovie(movieData);
        } catch (error) {
          console.error("Failed to fetch movie details:", error);
          // Handle error state as necessary
        } finally {
          setLoading(false); // Set loading to false after the request
        }
      };
    useEffect(() => {
        fetchMovieDetails()
    }, [id])



  return (
    <div className="w-full px-14 overflow-hidden py-6">
        <div className="w-full flex items-center justify-center">
        <MovieBackdropAndInfo
        backdropPath={movie?.backdrop_path}
        id={movie?.id}
        title={movie?.title}
        runtime={movie?.runtime}
        logo={movie?.logo}
        cast={movie?.cast}
        overview={movie?.overview}
        genres={movie?.genres}
        isModalOpen={false}
        setIsModalOpen={() => {}}
        loading={loading}
        tagline={movie?.tagline}
        networks={movie?.networks}
        />
        </div>
    </div>
  )
}

export default MovieDetails