import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";

import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
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
            className="button-movie-view-add-favorite"
            variant="outline-warning"
            size="sm"
            type="button"
            onClick={() => addFavorite(movie._id)}
          >
            Add to favorites
          </Button>

        <Button
              className="back-button mt-2"
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