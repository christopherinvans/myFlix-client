import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

export function NavigationBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          myFlix React
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link className="mt-2" href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button className="mt-2" variant="link" onClick={onLoggedOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link className="text-white" href="/">Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link className="text-white" href="/register">Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}