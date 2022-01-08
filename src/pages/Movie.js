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
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { userDetails } = useContext(AppContext);
  const [message , setMessage ] = useState("") ;
  const [loadData ,setLoadData] = useState(false) ; 

  const messageHandler = (newMessage)=> {
   
    setMessage(newMessage) ;
    setLoadData(!loadData) ;
    setTimeout( () => {
      setMessage("") ; 
    }, 4000)

  }

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
        setReviews(responseData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllReviews();
  }, [loadData]);

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
                <p>
                  <text
                    style={{
                      fontWeight: "bolder",
                      fontSize: "28px",
                      color: "white",
                    }}
                  >
                    YOUR REVIEWS
                  </text>

                  {userDetails.isAuthenticated ? (
                    <Link
                      className="btn btn-primary"
                      style={{ float: "right" }}
                      onClick={() => {
                        setShowReviewForm(!showReviewForm);
                      }}
                    >
                      + REVIEW
                    </Link>
                  ) : (
                    <Link
                      className="btn btn-primary"
                      style={{ float: "right" }}
                      to="/login"
                    >
                      Signin to Add REVIEW
                    </Link>
                  )}
                </p>
                { message && <p className = "text-center text-white">{message} </p>}
                {showReviewForm && (
                  <AddReview
                    movie_id={currentMovie.movie_id}
                    username={userDetails.username}
                    setShowReviewForm={setShowReviewForm}
                    onAddReview = {messageHandler}
                  />
                )}
                {/* {userDetails.isAuthenticated  && <ReviewList list={reviews.filter( (item)=> (item.username === userDetails.username))} username = {userDetails.username}  /> } */}
                <ReviewList
                  list={reviews.filter(
                    (item) => item.username === userDetails.username
                  )}
                  username={userDetails.username}
                  onDeleteReview = {messageHandler}
                />
              </div>
            </div>

            {/* All Reviews */}

            <div className="mt-4">
              <div>
                <p
                  style={{
                    fontWeight: "bolder",
                    fontSize: "28px",
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
