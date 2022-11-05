import React, { useEffect, useState } from 'react';
import './App.css';
import { save, getAll } from "./services/review";

function App() {

  const [reviews, setreviews] = useState();
  const [name, setName] = useState();
  const [movie, setMovies] = useState();
  const [review, setReview] = useState();

  const handleSubmit = event => {
    event.preventDefault();

    save("/doc", {
      name: event.target.name.value,
      movie: event.target.movie.value,
      reviewText: event.target.review.value
    })
      .then(response => response);

    setTimeout(() => {
      getAll("/all")
        .then(response => {
          setreviews(response.data)
          setName('');
          setMovies('');
          setReview('');
        });
    }, 1500);
  }

  const ReviewGridWrapper = ({ reviews }) => {
    return (
      <div className="reviewsGrid">
        {
          reviews?.map(review => {
            return <div>
              <div style={{ "border-color": "black", "border-width": "0.5px", "border-style": "groove", "marginTop": "5px" }}>
                <div style={{ 'marginLeft': '10px', 'height': '100%', marginTop: "10px" }} >
                  <strong>{review?.title}</strong>
                  <div style={{}}>
                    <span style={{ fontWeight: 'bold' }} >Name: </span>
                    <span>{review.name}</span>
                  </div>
                  <div style={{}}>
                    <span style={{ fontWeight: 'bold' }} >Movie: </span>
                    <span>{review.movie}</span>
                  </div>
                  <div class="mt-2">
                    <span style={{ fontWeight: 'bold' }}>Review: </span>
                    <span >{review.text_review}</span>
                  </div>
                </div>
                <div>
                  {review.review_prediction_value.predicted_value == "POSITIVE"
                    ?
                    <div style={{ margin: "10px" }}>
                      <div style={{ marginTop: "15px", marginRight: "10px", float: 'left' }}>
                        <span style={{ fontWeight: 'bold', marginBottom: "10px" }}  >Emotion: </span>
                      </div>
                      <img width="50" height="50" src="./../assets/positive.png" />
                    </div>
                    :
                    <div style={{ margin: "10px" }}>
                      <div style={{ marginTop: "15px", marginRight: "10px", float: 'left' }}>
                        <span style={{ fontWeight: 'bold' }}  >Emotion: </span>
                      </div>
                      <img width="50" height="50" src="./../assets/negative.png" />
                    </div>}
                </div>
              </div>
            </div>
          })
        }
      </div>
    )
  }
  return (
    <div className="wrapper">
      <h1>IMDB Review Classification</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p style={{ fontWeight: 'bold' }}>Name:</p>
            <input name="name" value={name} />
          </label>
          <label>
            <p style={{ fontWeight: 'bold' }}>Movie:</p>
            <input name="movie" value={movie} />
          </label>
          <label>
            <p style={{ fontWeight: 'bold' }}>Review: </p>
            <textarea  value={review} style={{ width: "500px", height: "75px" }} type="textarea" name="review" />
          </label>
          <div style={{ marginTop: "10px" }}>
            <button type="submit">Submit</button></div>
        </fieldset>
      </form>
      <div style={{ margin: "10px" }}>
        <h2 >Users Reviews</h2>
        <div>
          <div>
            <div>
              <ReviewGridWrapper reviews={reviews} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;