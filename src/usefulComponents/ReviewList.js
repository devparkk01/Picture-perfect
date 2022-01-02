import Review from "./Review";

const ReviewList = (props) => {
  return (
    <>
      {props.list.length === 0 && (
        <p style={{ color: "red" }}> No reviews added </p>
      )}
      {props.list.length > 0 && (
        <div>
          {props.list.map((review) => (
            <Review review={review} key = {review.review_id} username = {props.username }/>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewList;
