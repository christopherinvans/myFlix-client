import React from "react";
import axios from 'axios';
import { Row, Col, Button, Image } from "react-bootstrap";
import PropTypes from 'prop-types';

import './movie-view.scss';

export class MovieView extends React.Component {
  handleFavoriteMovie(e) {
    const { movie } = this.props;
    e.preventDefault();
    axios
      .post(
        `https://enigmatic-river-99618.herokuapp.com/users/${localStorage.getItem(
          "user"
        )}/Movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        alert(`${movie.Title} successfully added to your favorites`);
      })
      .then((res) => {
        document.location.reload(true);
      })
      .catch((error) => {
        alert(`${movie.Title} not added to your favorites` + error);
      });
  }
 
  render() {
    const { movie, onBackClick, handleFavoriteMovie } = this.props;
    console.log(this.props);

    return (
      <div className="movie-view">
        <div className="movie-poster">test
        <href src={movie.ImagePath}  />
        </div>

        <div className="movie-title">
          <span className="label">Title:</span>
          <span className="value"> {movie.Title} </span>
        </div>

        <div className="movie-description">
          <span className="label"> Description:</span>
          <span className="value"> {movie.Description} </span>
        </div>

        <div className="movie-genre">
          <span className="label"> Genre:</span>
          <span className="value"> {movie.Genre.Name} </span>
        </div>

        <div className="movie-director">
          <span className="label"> Director:</span>
          <span className="value"> {movie.Director.Name} </span>
        </div>

        <div className="movie-director-bio">
          <span className="label">About the director: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <Button
            className="favorite-button mt-3 btn-md"
            variant="outline-primary"
            value={movie._id}
            onClick={(e) => this.handleFavoriteMovie(e, movie)}
          >
            Add to Favorite Movies
          </Button>

        <Button
              className="back-button mt-3"
              variant="secondary"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};