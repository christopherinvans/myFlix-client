import React from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { Navbar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import './main-view.scss';
// import MoviesList from '../movies-list/movies-list';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      favoriteMovies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }
  componentDidMount() {
   
    let favoriteMovies=localStorage.getItem("favoriteMovies").split(",")
    this.setState({favoriteMovies})
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }
  updateFavoriteMovies=(favoriteMovies)=>{this.setState({favoriteMovies})}

  getMovies(token) {
    axios
      .get("https://enigmatic-river-99618.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem('token', authData.token);
  localStorage.setItem('user', authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.setState({
    user: null
  });
}

toRegister(registered) {
  this.setState({
    registered,
  });
}

render() {
  const { movies, user, favoriteMovies, selectedMovie } = this.state;
  return (
    <BrowserRouter>
    {/* <Routes> */}
      <Navbar user={user} />
      <Row className="main-view justify-content-md-center mt-3">
        <Route
          exact
          path="/"
          render={() => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map((m) => (
              <Col md={3} key={m._id}>
                <MovieCard updateFavoriteMovies={this.updateFavoriteMovies}movie={m} />
              </Col>
            ));
          }}
        />
        <Route
          path="/register"
          render={() => {
            if (user) return <Redirect to="/" />;
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }}
        />
       

        {/* route for link on main-view to profile-view */}

        <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView 
                  user={user} 
                  goBack={history.goBack} 
                  favoriteMovies={favoriteMovies} 
                  handleFavorite={this.handleFavorite}
                  onBackClick={() => history.goBack()} 
                  movies={movies} 
                  updateFavoriteMovies={this.updateFavoriteMovies}/>
                </Col>
              );
            }}
          />

          <Route
            path={`/user-update/:username`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UserUpdate
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />


        <Route
          path="/movies/:movieId"
          render={({ match, history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                  addFavorite={this.addFavorite}
                />
              </Col>
            );
          }}
        />

        <Route
          path="/directors/:name"
          render={({ match, history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <DirectorView
                  director={
                    movies.find((m) => m.Director.Name === match.params.name)
                      .Director
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />

        <Route
          path="/genres/:name"
          render={({ match, history }) => {
            if (!user)
              return (
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              );
            if (movies.length === 0) return <div className="main-view" />;
            return (
              <Col md={8}>
                <GenreView
                  genre={
                    movies.find((m) => m.Genre.Name === match.params.name)
                      .Genre
                  }
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
        />
      </Row>
    {/* </Routes> */}
    </BrowserRouter>
  );
}
}

export default MainView;