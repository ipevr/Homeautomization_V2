import React from "react";
import { connect } from "react-redux";
import { createPlug } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class PlugCreate extends React.Component {
  onSubmit = (formValue) => {
    this.props.createPlug(formValue);
  };

  render() {
    const inputFields = [
      { name: "title", label: "Enter Title" },
      { name: "systemCode", label: "Enter System Code" },
      { name: "unitCode", label: "Enter Unit Code" },
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

export default connect(null, { createPlug })(PlugCreate);
