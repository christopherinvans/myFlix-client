import React, { useState } from 'react';
import axios from "axios";
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';

// Import React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { CardGroup } from 'react-bootstrap';
import { Figure } from "react-bootstrap";

import './profile-view.scss';

export function ProfileView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    // Declare hook for each input
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');
    let { user, movies, favoriteMovies, onBackClick } = props;
    console.log(props);
    // console.log(this.state);

// Validate user inputs
const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 or more characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 or more characters');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email must be a valid email address');
      isReq = false;
    }

    return isReq;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem('token');
    if (isReq && token !== null && user !== null) {
      axios
        .put(
          `https://enigmatic-river-99618.herokuapp.com/users/${user}`,

          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          updateUser(data.Username);
          localStorage.setItem('user', data.Username);
          alert(
            'Update successful! Your changes will be visible after the next login.'
          );
        })
        .catch((e) => {
          console.error(e);
          alert('Unable to update user infos :(');
        });
    }
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (confirm('Are you sure? This cannot be undone!')) {
      axios
        .delete(`https://enigmatic-river-99618.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert(`Your account has been deleted. We're sorry to see you go!`);
          localStorage.clear();
          deleteUser({});
          window.open('/', '_self');
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Container className="profile-container">
      <Card bg="light" text="dark" className="profile-card">
        <Card.Header className="text-center" as="h5">
          Profile
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card bg="light" border="dark" text="dark">
              <span className="label text-center headline-profile-update">
                Update Profile Information
              </span>
              <Form>
                <Form.Group
                  className="profile-form-group-username"
                  controlId="formGroupUsername"
                >
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                  {usernameErr && <p>{usernameErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-password"
                  controlId="formGroupPassword"
                >
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password must be 6 or more characters"
                    minLength="6"
                    required
                  />
                  {passwordErr && <p>{passwordErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-email"
                  controlId="formGroupEmail"
                >
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                  {emailErr && <p>{emailErr}</p>}
                </Form.Group>
                <Form.Group
                  className="profile-form-group-birthday"
                  controlId="formGroupBirthday"
                >
                  <Form.Label>Date of birth:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="Enter your birthday"
                  />
                  {birthdayErr && <p>{birthdayErr}</p>}
                </Form.Group>
                <Button
                  className="button-profile-view-update"
                  variant="secondary"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Form>
              <span className="label headline-profile-mini-cards">
                My Favorite Movies
              </span>
              <Row>
                {console.log(favoriteMovies)}
        {favoriteMovies.length > 0 &&
          movies.filter(m=>favoriteMovies.includes(m._id)).map((m) => (
            <Col className="mb-5 mt-2"  key={m._id} sm={12} md={12} lg={6}>
              <MovieCard updateFavoriteMovies={props.updateFavoriteMovies}movie={m} />
            </Col>
          ))}
      </Row>
            </Card>
            <Card bg="light" border="dark" text="dark">
              <span className="label text-center headline-profile-delete">
                Delete Account
              </span>
              <Col>
                <Button
                  className="button button-profile-view-delete"
                  variant="danger"
                  type="submit"
                  onClick={handleDelete}
                >
                  DELETE ACCOUNT PERMANENTLY
                </Button>
              </Col>
            </Card>
          </CardGroup>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-profile-view-back"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired,
  favoriteMovies: PropTypes.array.isRequired,
  // removeFavorite: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

// export default connect(mapStateToProps, {
//   deleteUser,
//   updateUser,
// })(ProfileView);
