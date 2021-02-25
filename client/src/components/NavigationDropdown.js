import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const NavigationDropdown = (props) => {
  const dropdownItem = (active, title, link) => (
    <NavDropdown.Item key={title} as={Link} to={link}>
      {title}
    </NavDropdown.Item>
  );

  return (
    <NavDropdown title={props.title} id="plugs-nav-dropdown">
      {props.items.map((item, index) =>
        dropdownItem(index === 0, item.title, item.link)
      )}
    </NavDropdown>
  );
};

export default NavigationDropdown;
