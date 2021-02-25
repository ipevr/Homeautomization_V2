import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPlug, editPlug } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class PlugEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPlug(this.props.match.params.id);
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
    ];

    return (
      <Container className="m-3">
        <h3>Edit a Plug</h3>
        <InputForm
          backLink="/plugs/modify"
          initialValues={_.pick(this.props.plug, [
            "title",
            "systemCode",
            "unitCode",
          ])}
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
  };
};

export default connect(mapStateToProps, { fetchPlug, editPlug })(PlugEdit);
