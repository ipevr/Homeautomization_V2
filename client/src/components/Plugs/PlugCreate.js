import React from "react";
import { connect } from "react-redux";
import { createPlug } from "../../actions";
import PlugForm from "./PlugForm";

class PlugCreate extends React.Component {
  onSubmit = (formValue) => {
    this.props.createPlug(formValue);
  };

  render() {
    return (
      <div className="container m-3">
        <h3>Create a Plug</h3>
        <PlugForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createPlug })(PlugCreate);
