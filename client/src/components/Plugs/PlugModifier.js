import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

class PlugModifier extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/plugs/edit/${this.props.plug.id}`}>
          <Button variant="primary" size="lg" className="ml-3">
            Edit
          </Button>
        </Link>
        <Link to={`/plugs/delete/${this.props.plug.id}`}>
          <Button variant="danger" size="lg" className="ml-3">
            Delete
          </Button>
        </Link>
      </div>
    );
  }
}

export default PlugModifier;
