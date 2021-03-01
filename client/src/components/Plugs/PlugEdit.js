import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPlug, editPlug, fetchCategories } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class PlugEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPlug(this.props.match.params.id);
    this.props.fetchCategories();
  }

  onSubmit = (formValues) => {
    this.props.editPlug(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.plug) {
      return <div>Loading...</div>;
    }

    const inputFields = [
      { name: "title", label: "Edit Title" },
      { name: "systemCode", label: "Edit System Code" },
      { name: "unitCode", label: "Edit Unit Code" },
      {
        name: "category",
        label: "Change the Category",
        options: this.props.categories,
      },
    ];

    return (
      <Container className="m-3">
        <h3>Edit a Plug</h3>
        <InputForm
          backLink="/plugs/modify"
          initialValues={{
            title: this.props.plug.title,
            systemCode: this.props.plug.systemCode,
            unitCode: this.props.plug.unitCode,
            category: this.props.categories.find(
              (category) => this.props.plug.category === category.id
            ).name,
          }}
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    plug: state.plugs[ownProps.match.params.id],
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, {
  fetchPlug,
  editPlug,
  fetchCategories,
})(PlugEdit);
