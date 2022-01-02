import { Form } from "react-bootstrap";
import { useState } from "react";
import config from "../config.json";

const BASE_URL = config.api.BASEURL;

const AddReview = (props) => {
  const username = props.username;
  const movie_id = props.movie_id;
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = BASE_URL + "/review";
    if( headline.length === 0 || rating === "" ) {
        return ;
    }

    const data = {
      movie_id: movie_id,
      username: username,
      headline: headline,
      review: review,
      rating: +rating,
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if( response.status === 200) {
        props.setShowReviewForm(false) ; 
        setTimeout( ()=> {
            window.location.reload(); 
        }, 100) ;
    }

  };

  return (
    
    <div
      className="m-3 p-3"
      style={{
        borderColor: "red",
        borderRadius: "10px ",
        backgroundColor: "grey",
      }}
    >
      <Form onSubmit={submitHandler}>
        <div className="form-group">
          <label style={{ color: "white" }}>Headline*</label>
          <input
            className="form-control"
            type="text"
            value = {headline} 
            onChange={(e) => {
              setHeadline(e.target.value);
            }}
            
          />
        </div>

        <div className="form-group">
          <label style={{ color: "white" }}> Review</label>
          <textarea
            className="form-control"
            value = {review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="form-group">
          <label style={{ color: "white" }}> Rating*</label>
          <input
            type="number"
            min="0"
            max="10"
            value = {rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          ></input>
        </div>
        <div className="form-group">
          <button type="submit" className="btn-primary my-3">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddReview;
