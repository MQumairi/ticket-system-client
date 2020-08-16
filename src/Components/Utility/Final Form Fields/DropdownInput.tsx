import React from "react";
import { FieldRenderProps } from "react-final-form";
import {
  FormFieldProps,
  Form,
  Label,
  Dropdown,
} from "semantic-ui-react";

interface IProps extends FieldRenderProps<any, any>, FormFieldProps {}

const SelectInput: React.FC<IProps> = ({
  input,
  width,
  options,
  placeholder,
  meta: { touched, error },
  defaultValue,
}) => {
  return (
    <Form.Field error={touched && error} width={width}>
      <Dropdown
        value={input.value}
        options={options}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        fluid
        selection
      />
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default SelectInput;
