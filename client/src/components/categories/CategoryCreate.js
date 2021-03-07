import React from "react";
import { connect } from "react-redux";
import { createCategory } from "../../actions";
import { Container } from "react-bootstrap";
import CategoriesInputForm from "./CategoriesInputForm";

class CategoryCreate extends React.Component {
  onSubmit = (formValue) => {
    this.props.createCategory(formValue);
  };

  render() {
    const inputFields = [{ name: "name", label: "Enter Category Name" }];

    return (
      <Container className="m-3">
        <h3>Create a Category</h3>
        <CategoriesInputForm
          backLink="/"
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

export default connect(null, { createCategory })(CategoryCreate);
