import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import NavigationDropdown from "./NavigationDropdown";

function Header() {
  const plugsDropdownItems = [
    { title: "List", link: "/plugs" },
    { title: "Create", link: "/plugs/create" },
    { title: "Modify", link: "/plugs/modify" },
  ];
  const categoriesDropdownItems = [
    { title: "Create", link: "/categories/create" },
    { title: "Modify", link: "/categories/modify" },
  ];

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Peters Plugs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavigationDropdown
              title="Plugs"
              items={plugsDropdownItems}
            ></NavigationDropdown>
            <NavigationDropdown
              title="Categories"
              items={categoriesDropdownItems}
            ></NavigationDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
