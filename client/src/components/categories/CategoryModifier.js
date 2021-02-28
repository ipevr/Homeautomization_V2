import React from "react";
import { connect } from "react-redux";
import { sortCategory } from "../../actions";
import history from "../../history";
import ButtonGroup from "../ButtonGroup";

class CategoryModifier extends React.Component {
  onButtonClick = (event) => {
    switch (event.target.value) {
      case "edit":
        history.push(`/categories/edit/${this.props.category.id}`);
        break;
      case "delete":
        history.push(`/categories/delete/${this.props.category.id}`);
        break;
      case "up":
        this.props.sortCategory(
          this.props.category.id,
          this.props.category.position - 1
        );
        break;
      case "down":
        this.props.sortCategory(
          this.props.category.id,
          this.props.category.position + 1
        );
        break;
      default:
        break;
    }
  };

  render() {
    const buttonProps = [
      { title: "Edit", value: "edit", variant: "primary" },
      { title: "Delete", value: "delete", variant: "danger" },
      { title: "Up", value: "up", variant: "secondary" },
      { title: "Down", value: "down", variant: "secondary" },
    ];

    return (
      <ButtonGroup
        onClick={this.onButtonClick}
        buttonProps={buttonProps}
      ></ButtonGroup>
    );
  }
}

export default connect(null, { sortCategory })(CategoryModifier);
