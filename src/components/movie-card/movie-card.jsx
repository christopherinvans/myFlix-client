import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import axios from 'axios';
import './movie-card.scss';

export const MovieCard= ({movie,updateFavoriteMovies})=> {

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
    return (
      <Card style={{height:'100%', padding:'10px'}} className="mt-2 mb-1">
        <Card.Img className="card-image" variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          </Card.Body>
          <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
          {!fav&&<Button onClick={addFavoriteMovieHandler}>Add to Favorites</Button>}
          {fav&&<Button onClick={deleteFavoriteMovieHandler}>Remove from Favorites</Button>}
          </Card.Footer>
        
      </Card>
    );
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