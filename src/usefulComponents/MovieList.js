import { MovieCard } from "./MovieCard";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import config from "../config.json";
import Loader from "./Loader";

const BASE_URL = config.api.BASEURL;

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchData = props.searchData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(BASE_URL + "/movie");
        const responseData = await response.json();
        console.log(responseData);
        setMovieList(responseData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filterMovies = (movie) => {
    return movie.title.toLowerCase().includes(searchData.toLowerCase());
  };

  return (
    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-1">

      {!loading ? (
        <>
          {movieList.filter(filterMovies).map((movie) => (
            <MovieCard
              key={movie.movie_id}
              title={movie.title}
              movie_id={movie.movie_id}
              genre={movie.genre}
              starCast={movie.StarCast}
              poster={movie.poster}
              description={movie.description}
            />
          ))}
        </>
      ) : (
        <Loader />
      )}

      {movieList.filter(filterMovies).length === 0 && !loading && (
        <div className = "mt-2 text-center no-movie">No movie found  :( </div>
      )}
    </Row>
  );
};

export default MovieList;
