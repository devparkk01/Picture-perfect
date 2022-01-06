import Card from "react-bootstrap/Card";
import config from "../config.json";

const Review = (props) => {
  const BASE_URL = config.api.BASEURL;

  const deleteReviewHandler = async () => {
    const url = BASE_URL + "/review/" + props.review.review_id;
    console.log(url);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
    });

    // const responseData = await response.json() ;
    console.log(response);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <Card className="border-primary mb-3 p-2">
      <Card.Title>
        <text className="btn-secondary">{props.review.username}</text>

        {props.username && (
          <img
          className="btn"
          style={{ float: "right" }}
          onClick={deleteReviewHandler}
          src = "https://img.icons8.com/plasticine/30/000000/filled-trash.png"
          />
          )}
          <text style={{ float: "right" }}>({props.review.rating}/10)</text>
        <hr />
      </Card.Title>
      <b
        className="btn-secondary"
        style={{ fontWeight: "bold", marginTop: "-10px", marginBottom: "10px" }}
      >
        {props.review.headline}
      </b>
      <p style={{ fontSize: "16px" }}>{props.review.review}</p>
    </Card>
  );
};

export default Review;
