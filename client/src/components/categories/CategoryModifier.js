import React from "react";
import history from "../../history";
import ButtonGroup from "../ButtonGroup";

class CategoryModifier extends React.Component {
  onButtonClick = (event) => {
    if (event.target.value === "edit") {
      history.push(`/categories/edit/${this.props.category.id}`);
    } else {
      history.push(`/categories/delete/${this.props.category.id}`);
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

export default CategoryModifier;
