import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import validate from "./validate";

class InputForm extends React.Component {
  renderInput = ({ input, label }) => {
    return (
      <Form.Group>
        <Form.Label className="font-weight-bold">{label}</Form.Label>
        <Form.Control {...input} autoComplete="off" />
      </Form.Group>
    );
  };

  renderOptions({ input, label, options }) {
    return (
      <Form.Group>
        <Form.Label className="font-weight-bold">{label}</Form.Label>
        <Form.Control {...input} as="select">
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  }

  renderFields = () =>
    this.props.inputFields.map(({ name, label, options }) => {
      return (
        <Field
          key={name}
          name={name}
          component={
            options && options.length > 0
              ? this.renderOptions
              : this.renderInput
          }
          label={label}
          options={options}
        />
      );
    });

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
