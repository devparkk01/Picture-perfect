import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export const MovieCard = (props) => {
  return (
    <Link to={`/movie/${props.movie_id}`}>
      <Col className="mr-2 my-2">
        <Card style={{ width: "min(100% ,220px)" }}>
          <Card.Img
            variant="top"
            src={props.poster}
            alt={props.title}
            height="300px"
          />
          <Card.Body className="remove-blue">
            <Card.Title className="text-center ">{props.title}</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
};

export const MovieInfo = (props) => {
  return (
    <Card className="text-white" style={{ backgroundColor: "black" }}>
      <Row>
        <div className="col-sm-4">
          <Card.Img
            variant="top"
            src={props.movie.poster}
            alt={props.movie.title}
            height="500px"
          />
        </div>

        {/* <Button variant="primary">Go somewhere</Button> */}
        <div className="col-sm-8">
          <Card.Body>
            <Card.Title>
              {props.movie.title}
              <hr />
            </Card.Title>
            <Card.Text>{props.movie.description}</Card.Text>

            <div style={{ color: "grey" }}>
              <p>Genre : {props.movie.genre.map((item) => `* ${item} `)} </p>
              <p>
                Starcast : {props.movie.starCast.map((item) => ` * ${item} `)}
              </p>
              <p> Director : {props.movie.director}</p>
              <p> Release Date : {props.movie.releaseDate}</p>
              <p> Duration : {props.movie.duration}</p>

            </div>
          </Card.Body>
        </div>
      </Row>
    </Card>
  );
};
