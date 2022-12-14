import React from 'react';
import axios from 'axios';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null
        }
      }

      componentDidMount(){
        axios.get('https://enigmatic-river-99618.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
// hello world
      render() {
        const { movies, selectedMovie } = this.state;
      
        if (selectedMovie) return <MovieView movie={selectedMovie} />;
      
        if (movies.length === 0) return <div className="main-view">Loading...</div>;
      
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
             ))
            }
          </div>
        );
      }
 }


export default MainView;
