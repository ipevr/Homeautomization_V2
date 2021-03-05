import React from "react";
import history from "../../history";
import ButtonGroup from "../ButtonGroup";

class GroupModifier extends React.Component {
  onButtonClick = (event) => {
    switch (event.target.value) {
      case "edit":
        history.push(`/groups/edit/${this.props.group.id}`);
        break;
      case "delete":
        history.push(`/groups/delete/${this.props.group.id}`);
        break;
      default:
        break;
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

export default GroupModifier;
