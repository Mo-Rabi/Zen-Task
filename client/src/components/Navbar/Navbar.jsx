import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export default function MyNavbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') !== null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Navbar collapseOnSelect expand="lg" className="nav bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to={''}>
            <img
              src="https://www.svgrepo.com/show/354463/trello.svg"
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {token ? (
              <>
                <Link className="nav-link" to={'profile'}>
                  Workspace
                </Link>
                <Link className="nav-link" to={'board'}>
                  Board
                </Link>
                <Link
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem('token');
                    setToken(false);
                  }}
                  to={'login'}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to={'register'}>
                  Register
                </Link>
                <Link className="nav-link" to={'login'}>
                  Login
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
