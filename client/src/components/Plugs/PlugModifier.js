import React from "react";
import history from "../../history";
import ButtonGroup from "../ButtonGroup";

class PlugModifier extends React.Component {
  onButtonClick = (event) => {
    if (event.target.value === "edit") {
      history.push(`/plugs/edit/${this.props.plug.id}`);
    } else {
      history.push(`/plugs/delete/${this.props.plug.id}`);
    }
  };

  render() {
    const buttonProps = [
      { title: "Edit", value: "edit", variant: "primary" },
      { title: "Delete", value: "delete", variant: "danger" },
    ];

    return (
      <ButtonGroup
        onClick={this.onButtonClick}
        buttonProps={buttonProps}
      ></ButtonGroup>
    );
  }
}

export default PlugModifier;
