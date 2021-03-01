import React from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPlugs, fetchCategories } from "../../actions";
import PlugActivator from "./PlugActivator";
import PlugModifier from "./PlugModifier";

class PlugList extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
    this.props.fetchCategories();
  }

  renderButtons(plug) {
    if (!this.props.match.params.modify) {
      return <PlugActivator plug={plug} />;
    } else {
      return <PlugModifier plug={plug} />;
    }
  }

  renderPlugs(category) {
    return this.props.plugs.map((plug) => {
      if (plug.category === category.id) {
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
      }
      return null;
    });
  }

  renderList() {
    this.props.categories.sort((cat1, cat2) =>
      cat1.position > cat2.position ? 1 : cat1.position < cat2.position ? -1 : 0
    );

    return this.props.categories.map((category) => (
      <ListGroup.Item key={category.id} className="pr-0">
        {category.name}
        {this.renderPlugs(category)}
      </ListGroup.Item>
    ));
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
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { fetchPlugs, fetchCategories })(
  PlugList
);
