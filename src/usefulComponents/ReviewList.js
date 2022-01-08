import Review from "./Review";

const ReviewList = (props) => {
  const onDeleteHandler = (newMessage) => {
    props.onDeleteReview(newMessage)
  }
  return (
    <>
      {props.list.length === 0 && (
        <p style={{ color: "grey" }}> No reviews found </p>
      )}
      {props.list.length > 0 && (
        <div>
          {props.list.map((review) => (
            <Review review={review} key = {review.review_id} username = {props.username } onDeleteHandler = {onDeleteHandler}/>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewList;
