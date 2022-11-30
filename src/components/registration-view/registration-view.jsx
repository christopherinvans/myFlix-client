import './registration-view.scss';

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Card, CardGroup, Container, Col, Row, } from "react-bootstrap";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    console.log(props);
    props.registration(username);
  };

  return (
    <Container className="register-container">
      <Row className="justify-content-md-center mt-5">
        <Col md={5}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title className="text-center" as="h4">
                  Please Register for the myFlix movie app!
                </Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="text"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength="8"
                      placeholder="Minimum 8 characters"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    className="sign-up-button mt-2 mr-2"
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >Register
                  </Button>
               
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  // movie: PropTypes.shape({
  //   // shape({..}) means that its an object
  //   Title: PropTypes.string.isRequired,
  //   Description: PropTypes.string.isRequired,
  //   ImagePath: PropTypes.string.isRequired,
  //   Genre: PropTypes.shape({
  //     Name: PropTypes.string.isRequired,
  //   }),
  // }).isRequired,
  registration: PropTypes.func.isRequired,
};
