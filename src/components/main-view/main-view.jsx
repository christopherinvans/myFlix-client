import React, { useState, useEffect } from 'react';
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
          selectedMovie: null,
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

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      registration(registered) {
        this.setState({
          registered,
        });
      }

      getMovies(token) {
        axios.get('https://enigmatic-river-99618.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      render() {
        // const { movies, selectedMovie, registered } = this.state;
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
        const [user, setUser] = useState(storedUser? storedUser : null);
        const [token, setToken] = useState(storedToken? storedToken : null);
        const [movies, setMovies] = useState([]);
        const [selectedMovie, setSelectedMovie] = useState(null);
      
        if (!registered) return (<RegistrationView registration={(register) => this.registration(register)}/>);

      
        if (!user) {
          return (
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          );
        }
      

        useEffect(() => {
              if (!token) {
                return;
              }
          
              fetch("https://enigmatic-river-99618.herokuapp.com/movies", {
                headers: { Authorization: `Bearer ${token}` }
              })
                .then((response) => response.json())
                .then((movies) => {
                  console.log(movies);
                  setMovies(movies);
                });
            }, [token]);
      
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
{/* <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button> */}

export default MainView;
