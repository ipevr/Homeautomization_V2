import React from "react";
import { connect } from "react-redux";
import { createGroup, fetchPlugs } from "../../actions";
import { Container } from "react-bootstrap";
import InputForm from "../InputForm";

class GroupCreate extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
  }

  onSubmit = (formValue) => {
    this.props.createGroup(formValue);
  };

  render() {
    const inputFields = [
      { name: "title", label: "Enter Title" },
      {
        name: "plugs",
        label: "Select Plugs to add to the Group",
        multiSel: this.props.plugs,
      },
    ];

    return (
      <Container className="m-3">
        <h3>Create a Group</h3>
        <InputForm
          backLink="/"
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    plugs: Object.values(state.plugs),
  };
};

export default connect(mapStateToProps, { createGroup, fetchPlugs })(
  GroupCreate
);
