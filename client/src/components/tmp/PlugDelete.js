import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPlug, deletePlug } from "../../actions";
import history from "../../history";
import ConfirmModal from "../ConfirmModal";

class PlugDelete extends React.Component {
  componentDidMount() {
    this.props.fetchPlug(this.props.match.params.id);
  }

  onConfirm = () => {
    this.props.deletePlug(this.props.match.params.id);
  };

  onDismiss = () => {
    history.push("/plugs/modify");
  };

  renderActions() {
    return (
      <React.Fragment>
        <Button as={Link} to="/plugs/modify" variant="secondary">
          Cancel
        </Button>
        <Button variant="danger" onClick={this.onConfirm}>
          Delete
        </Button>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.plug) {
      return "Are you sure you want to delete this plug?";
    }

    return `Are you sure you want to delete the plug "${this.props.plug.title}"?`;
  }

  render() {
    return (
      <ConfirmModal
        title="Delete Plug"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    plug: state.plugs[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchPlug, deletePlug })(PlugDelete);
