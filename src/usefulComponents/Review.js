import Card from "react-bootstrap/Card";
import config from "../config.json";

const Review = (props) => {
  const BASE_URL = config.api.BASEURL;

  const deleteReviewHandler = async () => {
    const url = BASE_URL + "/review/" + props.review.review_id;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response)

    props.onDeleteHandler("Review Deleted Successfully");
  };

  return (
    <Card
      className="mb-3 p-2 text-white"
      style={{ backgroundColor: "#1f2124" }}
    >
      <Card.Title>
        <img src="../img/user-solid.svg" style={{ width: "24px" }} />
        <text style={{ marginLeft: "10px" }}>{props.review.username}</text>

        {props.username && (
          <img
            className="btn"
            style={{ float: "right", marginTop: "-6px" }}
            onClick={deleteReviewHandler}
            src="https://img.icons8.com/plasticine/25/000000/filled-trash.png"
          />
        )}
        <text style={{ float: "right" }}>({props.review.rating}/10)</text>
        <hr />
      </Card.Title>
      <text
        // className="btn-secondary"
        style={{ fontWeight: "bold", marginTop: "-20px", marginBottom: "10px" }}
      >
        {props.review.headline}
      </text>
      <p style={{ fontSize: "16px" }}>{props.review.review}</p>
    </Card>
  );
};

export default Review;
