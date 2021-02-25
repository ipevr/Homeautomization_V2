import React from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPlugs } from "../../actions";
import PlugActivator from "./PlugActivator";
import PlugModifier from "./PlugModifier";

class PlugList extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
  }

  renderButtons(plug) {
    if (!this.props.match.params.modify) {
      return <PlugActivator plug={plug} />;
    } else {
      return <PlugModifier plug={plug} />;
    }
  }

  renderList() {
    return this.props.plugs.map((plug) => {
      return (
        <ListGroup.Item key={plug.id} className="pr-0">
          <Row>
            <Col sm="8">
              <h4>{plug.title}</h4>
            </Col>
            {this.renderButtons(plug)}
          </Row>
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
