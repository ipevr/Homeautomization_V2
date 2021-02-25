import React from "react";
import { Col, Button } from "react-bootstrap";

const ButtonGroup = (props) => {
  const renderButtons = () => {
    return props.buttonProps.map((button) => {
      return (
        <Button
          key={button.title}
          onClick={props.onClick}
          value={button.value}
          variant={button.variant}
          size="lg"
          className="ml-3"
        >
          {button.title}
        </Button>
      );
    });
  };

  return (
    <Col sm={props.buttonProps.length * 2} className="text-right">
      {renderButtons()}
    </Col>
  );
};

export default ButtonGroup;
