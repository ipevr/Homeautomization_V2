import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchGroup, editGroup } from "../../actions";
import { Container } from "react-bootstrap";
import GroupInputForm from "./GroupInputForm";

class GroupEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editCategory(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.group) {
      return <div>Loading...</div>;
    }

    const inputFields = [
      { name: "title", label: "Enter Title" },
      {
        name: "plugs",
        label: "Select Plugs to add to the Group",
        plugs: this.props.plugs,
      },
    ];

    return (
      <Container className="m-3">
        <h3>Edit a Group</h3>
        <GroupInputForm
          backLink="/categories/modify"
          initialValues={_.pick(this.props.group, ["name"])}
          inputFields={inputFields}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchGroup, editGroup })(GroupEdit);
