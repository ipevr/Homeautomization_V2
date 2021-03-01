import React from "react";
import { connect } from "react-redux";
import { createPlug, fetchCategories } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class PlugCreate extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  onSubmit = (formValue) => {
    console.log(formValue);
    this.props.createPlug(formValue);
  };

  render() {
    const inputFields = [
      { name: "title", label: "Enter Title" },
      { name: "systemCode", label: "Enter System Code" },
      { name: "unitCode", label: "Enter Unit Code" },
      {
        name: "category",
        label: "Select a Category",
        options: this.props.categories,
      },
    ];

    return (
      <Container className="m-3">
        <h3>Create a Plug</h3>
        <InputForm
          backLink="/plugs"
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { createPlug, fetchCategories })(
  PlugCreate
);
