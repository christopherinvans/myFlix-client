import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
// import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';

// MovieView receives property from the MainView - movies
export const MovieView = () => {
  const movies = useSelector((state) => state.movies.movies);
  

  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  let similarMovies = movies.filter((filteredMovie) => {
    return (
      filteredMovie.genre.name === movie.genre.name &&
      filteredMovie.title !== movie.title
    );
  });

  return (
    <>
      {movies.length === 0 ? (
        <Col>The list is empty</Col>
      ) : (
        <>
          <Row className='d-flex flex-row-reverse p-3'>
            <Col md={5} className='text-center text-md-end'>
              <img
                src={movie.image}
                alt={`Poster for ${movie.title}`}
                className='img-fluid h-100 w-auto movie-view-img'
              />
            </Col>
            <Col md={7} className='d-flex flex-column'>
              <Row className='d-flex flex-row  justify-content-between'>
                <Col md={9} className='d-flex flex-column'>
                  <h3 className='my-0'>
                    <span>Title: </span>
                    <span>{movie.title}</span>
                  </h3>
                  <h5 className='mt-1 text-left text-muted'>
                    <span>Director: </span>
                    <span>{movie.director.name}</span>
                  </h5>
                </Col>

                <Col md={3} className='align-self-end mb-2 text-end'>
                  <span>Genre: </span>
                  <span className='fw-bolder'>{movie.genre.name}</span>
                </Col>
              </Row>
              <div className='mt-md-5 mb-4'>
                <div className='text-decoration-underline mb-2'>
                  Description:{' '}
                </div>
                <span>{movie.description}</span>
              </div>
              <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
                <Col className='text-start'>
                  <FavoriteIcon
                    movie={movie}
                  />
                </Col>
                <Col className='text-end'>
                  <Link to={`/`}>
                    <Button variant='secondary' size='lg'>
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <h2 className='mt-0'>Similar movies</h2>
            <hr />
            {similarMovies.map((movie) => (
              <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard
                  movieData={movie}
                />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};


// import React from "react";
// import axios from 'axios';
// import { Row, Col, Button, Image } from "react-bootstrap";
// import PropTypes from 'prop-types';

// import './movie-view.scss';

// export class MovieView extends React.Component {
//   addFavorite(movie) {
//     let token = localStorage.getItem("token");
//     let url =
//       "https://enigmatic-river-99618.herokuapp.com/users/" +
//       localStorage.getItem("user") +
//       "/movies/" +
//       movie._id;

//     console.log(token);

//     axios
//       .post(url, "", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         console.log(response);
//         window.open("/users", "_self");
//       });
//     }
 
//   render() {
//     const { movie, onBackClick, handleFavoriteMovie } = this.props;
//     console.log(this.props);

//     return (
//       <div className="movie-view">
//         <div className="movie-poster">
//         <img src={movie.ImagePath}  />
//         </div>

//         <div className="movie-title">
//           <span className="label">Title:</span>
//           <span className="value"> {movie.Title} </span>
//         </div>

//         <div className="movie-description">
//           <span className="label"> Description:</span>
//           <span className="value"> {movie.Description} </span>
//         </div>

//         <div className="movie-genre">
//           <span className="label"> Genre:</span>
//           <span className="value"> {movie.Genre.Name} </span>
//         </div>

//         <div className="movie-director">
//           <span className="label"> Director:</span>
//           <span className="value"> {movie.Director.Name} </span>
//         </div>

//         <div className="movie-director-bio">
//           <span className="label">About the director: </span>
//           <span className="value">{movie.Director.Bio}</span>
//         </div>

//         <Button
//             className="favorite-button mt-3 btn-md"
//             variant="outline-primary"
//             value={movie._id}
//             onClick={(e) => this.addFavoriteMovie(e, movie)}
//           >
//             Add to Favorite Movies
//           </Button>

//         <Button
//               className="back-button mt-3"
//               variant="secondary"
//               onClick={() => {
//                 onBackClick();
//               }}
//             >
//               Back
//             </Button>
//       </div>
//     );
//   }
// }

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     ImagePath: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//     }).isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Death: PropTypes.string.isRequired,
//     }).isRequired,
//   }).isRequired,
//   onBackClick: PropTypes.func.isRequired,
// };