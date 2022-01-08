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
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const url = BASE_URL + "/review";

    if (headline.length === 0) {
      setMessage("Headline is required");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    if (rating === "") {
      setMessage("Rating is required");
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    const data = {
      movie_id: movie_id,
      username: username,
      headline: headline,
      review: review,
      rating: +rating,
    };

    // console.log(data) ;

    props.setShowReviewForm(false);

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    props.onAddReview("Review added Successfully");
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
      {message && <p style={{ color: "darkred" }}> *{message}</p>}
      <Form onSubmit={submitHandler}>
        <div className="form-group">
          <label style={{ color: "white" }}>Headline*</label>
          <input
            className="form-control"
            type="text"
            value={headline}
            onChange={(e) => {
              setHeadline(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label style={{ color: "white" }}> Review</label>
          <textarea
            className="form-control"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          ></textarea>
        </div>

        <div className="form-group">
          <select
            style={{ width: "160px", marginTop: "20px" }}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="none" selected hidden>
              Select a rating*
            </option>
            <option value="1"> 1 </option>
            <option value="2"> 2 </option>
            <option value="3"> 3 </option>
            <option value="4"> 4 </option>
            <option value="5"> 5 </option>
            <option value="6"> 6 </option>
            <option value="7"> 7 </option>
            <option value="8"> 8 </option>
            <option value="9"> 9 </option>
            <option value="10"> 10 </option>
          </select>

          {/* <input
            type="number"
            min="0"
            max="10"
            value = {rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          ></input> */}
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
