import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../usefulComponents/Navbar";
import { MovieInfo } from "../usefulComponents/MovieCard";
import config from "../config.json";
import Loader from "../usefulComponents/Loader";
import ReviewList from "../usefulComponents/ReviewList";
import { AppContext } from "../lib/contextLib";
import { Link } from "react-router-dom";
import AddReview from "../usefulComponents/AddReview";

const BASE_URL = config.api.BASEURL;

const Movie = (props) => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm , setShowReviewForm] = useState(false) ; 
  const {isAuthenticated, setIsAuthenticated , username } = useContext(AppContext);

  useEffect(() => {
    const fetchMovie = async () => {
      const url = BASE_URL + "/movie/" + id;
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setCurrentMovie(responseData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const curl = BASE_URL + "/movie/" + id + "/reviews";
      try {
        const response = await fetch(curl);
        const responseData = await response.json();
        console.log(responseData);
        setReviews(responseData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllReviews();
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className="container"
        style={{ backgroundColor: "black", maxWidth: "1100px" }}
      >
        {!loading ? (
          <div className="my-5">
            <MovieInfo movie={currentMovie} />

            {/* Reviews */}

            {/* Your reviews */}
            <div className="mt-4">
              <div>
                <text
                  style={{
                    fontWeight: "bolder",
                    fontSize: "30px",
                    color: "white",
                  }}
                >
                  YOUR REVIEWS
                </text>

                {isAuthenticated ? (
                  <Link className = "btn btn-primary" style = {{ float : "right"}} onClick = { () => {setShowReviewForm(!showReviewForm)}}> + REVIEW</Link>
                ) : (
                  <Link className = "btn btn-primary" style = {{float : "right"}} to = "/login"> Signin to Add REVIEW</Link>
                )}

                { showReviewForm && <AddReview movie_id = {currentMovie.movie_id} username = {username} setShowReviewForm = {setShowReviewForm} />}
              {isAuthenticated  ? <ReviewList list={reviews.filter( (item)=> (item.username === username))} username = {username}  /> : <h3> No reviews found</h3> }

              </div>

            </div>

            {/* Other Reviews */}

            <div className="mt-4">
              <div>
                <p
                  style={{
                    fontWeight: "bolder",
                    fontSize: "30px",
                    color: "white",
                  }}
                >
                  ALL REVIEWS
                </p>
              </div>

              <ReviewList list={reviews} />
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Movie;
