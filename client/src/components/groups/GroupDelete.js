import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGroup, deleteGroup } from "../../actions";
import history from "../../history";
import ConfirmModal from "../ConfirmModal";

class GroupDelete extends React.Component {
  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.id);
  }

  onConfirm = () => {
    this.props.deleteGroup(this.props.match.params.id);
  };

  onDismiss = () => {
    history.push("/groups/modify");
  };

  renderActions() {
    return (
      <React.Fragment>
        <Button as={Link} to="/groups/modify" variant="secondary">
          Cancel
        </Button>
        <Button variant="danger" onClick={this.onConfirm}>
          Delete
        </Button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.category) {
      return "Are you sure you want to delete this group?";
    }

    return `Are you sure you want to delete the group "${this.props.group.name}"?`;
  }

  render() {
    return (
      <ConfirmModal
        title="Delete Group"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    group: state.groups[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchGroup, deleteGroup })(
  GroupDelete
);
