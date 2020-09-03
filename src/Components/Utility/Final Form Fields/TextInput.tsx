import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {
      inputLabel : string;
      readOnly: boolean;
    }

const TextInput : React.FC<IProps> = ({
  input,
  width,
  type,
  placeholder,
  readOnly,
  meta: { touched, error },
  inputLabel
}) => {
  return (
    <Form.Field error={touched && error} type={type} width={width}>
      <label>{inputLabel}</label>
      <input disabled={readOnly} readOnly={readOnly} {...input} placeholder={placeholder} value={input.value}></input>
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default TextInput;
