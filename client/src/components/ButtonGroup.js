import React from "react";
import { Button } from "react-bootstrap";

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
          className="mr-3"
        >
          {button.title}
        </Button>
      );
    });
  };

  return renderButtons();
};

export default ButtonGroup;
