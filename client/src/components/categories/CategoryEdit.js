import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchCategory, editCategory } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class CategoryEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editCategory(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.category) {
      return <div>Loading...</div>;
    }

    const inputFields = [{ name: "name", label: "Edit Name" }];

    return (
      <Container className="m-3">
        <h3>Edit a Category</h3>
        <InputForm
          backLink="/categories/modify"
          initialValues={_.pick(this.props.category, ["name"])}
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.categories[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchCategory, editCategory })(
  CategoryEdit
);
