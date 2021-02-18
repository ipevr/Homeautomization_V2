import React from "react";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

class PlugForm extends React.Component {
  renderInput = ({ input, label }) => {
    return (
      <Form.Group>
        <Form.Label className="font-weight-bold">{label}</Form.Label>
        <Form.Control {...input} autoComplete="off" />
      </Form.Group>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="systemCode"
          component={this.renderInput}
          label="Enter System Code"
        />
        <Field
          name="unitCode"
          component={this.renderInput}
          label="Enter Unit Code"
        />
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: "plugForm",
  validate,
})(PlugForm);
