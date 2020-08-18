import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label, Select } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<any, any>,
    FormFieldProps {
      inputLabel : string;
    }

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
  inputLabel
}) => {
  return (
    <Form.Field error={touched && error} width={width}>
      <label>{inputLabel}</label>
      <Select
        value={input.value}
        options={options}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
      />
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default SelectInput;