import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          
          <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
          </Link>
          {/* <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button> */}
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    // shape({..}) means that its an object
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};