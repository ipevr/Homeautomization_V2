import React from "react";
import { Container, ListGroup, CardDeck, Card, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchPlugs, fetchCategories, fetchGroups } from "../../actions";
import PlugActivator from "./PlugActivator";
import PlugModifier from "./PlugModifier";

class PlugList extends React.Component {
  componentDidMount() {
    this.props.fetchPlugs();
    this.props.fetchCategories();
    this.props.fetchGroups();
  }

  categoryHasPlugs(category) {
    return this.props.plugs.find((plug) => plug.category === category.id);
  }

  renderButtons(plug) {
    if (!this.props.match.params.modify) {
      return <PlugActivator plug={plug} />;
    } else {
      return <PlugModifier plug={plug} />;
    }
  }

  renderPlug(plug) {
    return (
      <Col key={plug.id} className="container-fluid mt-3">
        <Card style={{ width: "18rem", backgroundColor: "#aaaaaa" }}>
          <Card.Body>
            <Card.Title>
              <h4>{plug.title}</h4>
            </Card.Title>
            {this.renderButtons(plug)}
          </Card.Body>
        </Card>
      </Col>
    );
  }

  renderGroup(group) {
    return (
      <Col key={group.id} className="container-fluid mt-3">
        <Card style={{ width: "18rem", backgroundColor: "#aaaaaa" }}>
          <Card.Body>
            <Card.Title>
              <h4>{group.name}</h4>
            </Card.Title>
            {this.renderButtons(group)}
          </Card.Body>
        </Card>
      </Col>
    );
  }

  renderPlugs(category) {
    return (
      <>
        <h3>{category.name}</h3>
        <CardDeck>
          {this.props.plugs.map((plug) => {
            if (plug.category === category.id) {
              return this.renderPlug(plug);
            }
            return null;
          })}
        </CardDeck>
      </>
    );
  }

  renderGroups() {
    return (
      <ListGroup.Item className="pr-0">
        <h3>Groups</h3>
        <CardDeck>
          {this.props.groups.map((group) => this.renderGroup(group))}
        </CardDeck>
      </ListGroup.Item>
    );
  }

  renderPlugList() {
    this.props.categories.sort((cat1, cat2) =>
      cat1.position > cat2.position ? 1 : cat1.position < cat2.position ? -1 : 0
    );

    return this.props.categories.map((category) => {
      if (this.categoryHasPlugs(category)) {
        return (
          <ListGroup.Item key={category.id} className="pr-0">
            {this.renderPlugs(category)}
          </ListGroup.Item>
        );
      }
      return null;
    });
  }

  render() {
    return (
      <Container fluid>
        <ListGroup variant="flush">
          {this.renderPlugList()}
          {this.renderGroups()}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    plugs: Object.values(state.plugs),
    categories: Object.values(state.categories),
    groups: Object.values(state.groups),
  };
};

export default connect(mapStateToProps, {
  fetchPlugs,
  fetchCategories,
  fetchGroups,
})(PlugList);
