import React from "react";
import { connect } from "react-redux";
import { createGroup, fetchPlugs } from "../../actions";
import { Container } from "react-bootstrap";
import GroupInputForm from "./GroupInputForm";

class GroupCreate extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
  }

  onSubmit = (formValue) => {
    this.props.createGroup(formValue);
    console.log(formValue);
  };

  render() {
    const inputFields = [
      { name: "name", label: "Enter Title" },
      {
        name: "plugs",
        label: "Select Plugs to add to the Group",
        plugs: this.props.plugs,
      },
    ];

    return (
      <Container className="m-3">
        <h3>Create a Group</h3>
        <GroupInputForm
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
