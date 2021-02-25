import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategory, deleteCategory } from "../../actions";
import history from "../../history";
import ConfirmModal from "../ConfirmModal";

class CategoryDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  onConfirm = () => {
    this.props.deleteCategory(this.props.match.params.id);
  };

  onDismiss = () => {
    history.push("/categories/modify");
  };

  renderActions() {
    return (
      <React.Fragment>
        <Button as={Link} to="/categories/modify" variant="secondary">
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
      return "Are you sure you want to delete this plug?";
    }

    return `Are you sure you want to delete the plug "${this.props.category.name}"?`;
  }

  render() {
    return (
      <ConfirmModal
        title="Delete Category"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.categories[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchCategory, deleteCategory })(
  CategoryDelete
);
