import { useEffect, useState, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current;
    console.log(revText);
    try {
      const response = await api.post("/api/v1/movies/review", {
        reviewBody: rev.value,
        imdbId: movieId,
      });

      const updateReviews = [
        ...reviews,
        {
          body: rev.value,
        },
      ];

      rev.value = "";

      setReviews(updateReviews);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <div key={r.imdbId}>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <hr />
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
