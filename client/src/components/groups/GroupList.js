import React from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchGroups } from "../../actions";
import GroupModifier from "./GroupModifier";

class GroupList extends React.Component {
  componentDidMount() {
    this.props.fetchGroups();
  }

  renderButtons(group) {
    return <GroupModifier group={group} />;
  }

  renderList() {
    return this.props.groups.map((group) => (
      <ListGroup.Item key={group.id} className="pr-0">
        <Row>
          <Col sm="4">
            <h4>{group.name}</h4>
          </Col>
          {this.renderButtons(group)}
        </Row>
      </ListGroup.Item>
    ));
  }

  render() {
    return (
      <Container fluid>
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
    groups: Object.values(state.groups),
  };
};

export default connect(mapStateToProps, { fetchGroups })(GroupList);
