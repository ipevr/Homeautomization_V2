import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchPlug, editPlug } from "../actions/index";
import PlugForm from "./PlugForm";

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

    return (
      <div className="container m-3">
        <h3>Edit a Plug</h3>
        <PlugForm
          initialValues={_.pick(this.props.plug, [
            "title",
            "systemCode",
            "unitCode",
          ])}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    plug: state.plugs[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchPlug, editPlug })(PlugEdit);
