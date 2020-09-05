import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  FormFieldProps,
  Form,
  Label,
  Dropdown,
} from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, any>, FormFieldProps {
  inputLabel: string;
}

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
  defaultValue,
  inputLabel,
  disabled
}) => {
  return (
    <Form.Field error={touched && error} width={width}>
      <label>{inputLabel}</label>
      <Dropdown
        value={input.value && input.value}
        options={options}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        fluid
        selection
        disabled={disabled}
      />
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default SelectInput;
