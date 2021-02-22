import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPlugs } from "../actions";
import PlugActivator from "./PlugActivator";

class PlugList extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
  }

  renderList() {
    console.log(this.props.plugs);
    return this.props.plugs.map((plug) => {
      return (
        <ListGroup.Item
          key={plug.id}
          className="d-flex align-items-center justify-content-between pr-0"
        >
          <h4>{plug.title}</h4>
          <PlugActivator plug={plug} />
        </ListGroup.Item>
      );
    });
  }

  render() {
    return (
      <Container fluid>
        <h2>Plugs:</h2>
        <ListGroup variant="flush">
          <ListGroup.Item></ListGroup.Item>
          {this.renderList()}
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    plugs: Object.values(state.plugs),
  };
};

export default connect(mapStateToProps, { fetchPlugs })(PlugList);
