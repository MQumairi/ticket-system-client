import React, { useEffect, useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {
  FormFieldProps,
  Form,
  Checkbox
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  inputLabel: string;
  defaultValueCheck: boolean;
}

const CheckBox: React.FC<IProps> = ({
  input,
  width,
  type,
  inputLabel,
  defaultValueCheck,
  meta: { touched, error },
}) => {
  
  const [checkedValue, setcheckedValue] = useState<boolean>(false);

  useEffect(() => {
      setcheckedValue(defaultValueCheck);
      input.onChange(defaultValueCheck);
      // eslint-disable-next-line
    }, [setcheckedValue, defaultValueCheck]);

  const handleOnChange = (e: any) => {
    setcheckedValue(!checkedValue);
    input.onChange(!checkedValue);
  };

  return (
    <Form.Field error={touched && error} type={type} width={width}>
      <Checkbox
        checked={checkedValue}
        label={inputLabel}
        onChange={(e) => handleOnChange(e)}
        toggle
      />
    </Form.Field>
  );
};

export default observer(CheckBox);
