import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
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

      onLoggedIn(user) {
        this.setState({
          user
        });
      }

      registration(registered) {
        this.setState({
          registered,
        });
      }

      render() {
        const { movies, selectedMovie, user, registered } = this.state;
      
        if (!registered) return (<RegistrationView registration={(register) => this.registration(register)}/>);

      
        if (!user)
            return (
              <LoginView
                onLoggedIn={(user) => this.onLoggedIn(user)}
                registration={(registered) => this.registration(registered)}
              />
            );
      
        if (movies.length === 0) return <div className="main-view" />;

        return (
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))
            }
          </Row>
        );
      }
    
    }


export default MainView;
