import React from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchCategories } from "../../actions";
import CategoryModifier from "./CategoryModifier";

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  renderButtons(category) {
    return <CategoryModifier category={category} />;
  }

  renderList() {
    this.props.categories.sort((cat1, cat2) =>
      cat1.position > cat2.position ? 1 : cat1.position < cat2.position ? -1 : 0
    );

    return this.props.categories.map((category) => (
      <ListGroup.Item key={category.id} className="pr-0">
        <Row>
          <Col sm="4">
            <h4>{category.name}</h4>
          </Col>
          {this.renderButtons(category)}
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
    categories: Object.values(state.categories),
  };
};

export default connect(mapStateToProps, { fetchCategories })(CategoryList);
