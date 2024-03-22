import React from 'react'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {NavLink, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../actions';

export default function Header() {
  
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signout());
  }

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span className='nav-link' onClick={logout}>Sign out</span>
        </li>
      </Nav>
    );
  }

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        {/* <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link> */}
        <li className="nav-item">
          <NavLink to='/signin' className='nav-link'>Sign in</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/signup' className='nav-link'>Sign up</NavLink>
        </li>
      </Nav>
    );
  }

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className="bg-body-tertiary" style={{ zIndex: 1 }}>
        <Container fluid>
          {/* <Navbar.Brand href="#home">Secondo</Navbar.Brand> */}
          <Link to='/' className='navbar-brand'>Secondo</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              {/* <Nav.Link href="/signin">Sign in</Nav.Link> */}
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            {/* <Nav> */}
              {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
              {/* <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link> */}
              {/* <li className="nav-item"> */}
                {/* <NavLink to='/signin' className='nav-link'>Sign in</NavLink> */}
              {/* </li> */}
              {/* <li className="nav-item"> */}
                {/* <NavLink to='/signup' className='nav-link'>Sign up</NavLink> */}
              {/* </li> */}
            {/* </Nav> */}
            
            {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}
