import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

class InputForm extends React.Component {
  renderInput = ({ input, label }) => (
    <Form.Group>
      <Form.Label className="font-weight-bold">{label}</Form.Label>
      <Form.Control {...input} autoComplete="off" />
    </Form.Group>
  );

  renderFields = () =>
    this.props.inputFields.map(({ name, label }) => (
      <Field
        key={name}
        name={name}
        component={this.renderInput}
        label={label}
      />
    ));

  onFormSubmit = (formValues) => this.props.onSubmit(formValues);

  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
        {this.renderFields()}
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
        <Button
          as={Link}
          to={this.props.backLink}
          variant="secondary"
          size="lg"
          className="ml-3"
        >
          Back
        </Button>
      </Form>
    );
  }
}

export default reduxForm({
  form: "plugForm",
  validate,
})(InputForm);
