import { useParams } from 'react-router';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import { Button, Row, Col } from 'react-bootstrap';
// import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';
import axios from 'axios';

// MovieView receives property from the MainView - movies
export const MovieView = ({movie}) => {
    
  let username=localStorage.getItem("user");
  let token=localStorage.getItem("token");
let favoriteMovies=localStorage.getItem("favoriteMovies")
let isFavorite=favoriteMovies&&favoriteMovies.split(",").includes(movie._id)?true:false;
console.log(movie.Title,isFavorite)
const [fav, setFav]=useState(isFavorite)
  function addFavoriteMovieHandler(){
   
axios.post(`https://enigmatic-river-99618.herokuapp.com/users/${username}/movies/${movie._id}`,{},{
  headers: { Authorization: `Bearer ${token}` },
})
.then(response=>{
  setFav(true)
  localStorage.setItem("favoriteMovies", response.data.FavoriteMovies)
  updateFavoriteMovies(response.data.FavoriteMovies)
  console.log(response)})
.catch(e=>console.error(e))
  }

  function deleteFavoriteMovieHandler(){
axios.delete(`https://enigmatic-river-99618.herokuapp.com/users/${username}/movies/${movie._id}`,{
  headers: { Authorization: `Bearer ${token}` },
})
.then(response=>{
  setFav(false)
  localStorage.setItem("favoriteMovies", response.data.FavoriteMovies)
  updateFavoriteMovies(response.data.FavoriteMovies)
  console.log(response)})
.catch(e=>console.error(e))
  }

console.log(movie)
  return (
    <>
        <>
          <Row>
            <Col>
              <img
                src={movie.ImagePath}
                alt={`Poster for ${movie.Title}`}
                className='img-fluid h-100 w-auto movie-view-img'
              />
            </Col>
            <Col className='d-flex flex-column'>
              <Row className='d-flex flex-row  justify-content-between'>
                <Col md={12} className='d-flex flex-column'>
                  <h3 className='text-left'>
                    <span>Title: </span>
                    <span>{movie.Title}</span>
                  </h3>
                  <h5 className='mt-3 text-left text-muted'>
                    <span>Director: </span>
                    <span>{movie.Director.Name}</span>
                  </h5>
                  <div className='text-left mt-2'>
                  <span>Genre: </span>
                  <span className='fw-bolder'>{movie.Genre.Name}</span>
                  </div>
                </Col>
              </Row>
              <div className='mt-3 md-5 mb-4 text-left'>
                <div className='text-decoration-underline mb-2'>
                  Description:{' '}
                </div>
                <span>{movie.Description}</span>
              </div>
              <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
                <Col>
                {!fav&&<Button size='lg' onClick={addFavoriteMovieHandler}>Add to Favorites</Button>}
          {fav&&<Button onClick={deleteFavoriteMovieHandler}>Remove from Favorites</Button>}
                </Col>
                <Col className=''>
                  <Link to={`/`}>
                    <Button variant='secondary' size='lg'>
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
         
        </>
    </>
  );
};


