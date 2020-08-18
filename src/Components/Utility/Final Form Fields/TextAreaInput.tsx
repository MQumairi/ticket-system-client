import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {
      inputLabel: string;
    }

const TextAreaInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error },
  inputLabel
}) => {
  return (
    <Form.Field error={touched && error} width={width}>
      <label>{inputLabel}</label>
      <textarea {...input} placeholder={placeholder}></textarea>
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default TextAreaInput;
