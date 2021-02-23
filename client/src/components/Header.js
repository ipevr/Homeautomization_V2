import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Link to="/">
          <Navbar.Brand>Peters Plugs</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/plugs" className="nav-link active">
              <Nav.Item>List</Nav.Item>
            </Link>
            <Link to="/plugs/create" className="nav-link active">
              <Nav.Item>Create</Nav.Item>
            </Link>
            <Link to="/plugs/modify" className="nav-link active">
              <Nav.Item>Modify</Nav.Item>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
