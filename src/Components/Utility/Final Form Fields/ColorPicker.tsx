import React, { useState, useEffect } from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";
import { SketchPicker, ColorResult } from "react-color";
import "./colorPicker.css";

interface IProps extends FieldRenderProps<string, HTMLElement>, FormFieldProps {
  inputLabel: string;
  statusOriginalColor: string;
  setSelectingColor: (selectingColor: boolean) => void;
  selectingColor: boolean;
}

const ColorPicker: React.FC<IProps> = ({
  input,
  width,
  type,
  meta: { touched, error },
  statusOriginalColor,
  setSelectingColor,
  selectingColor,
  inputLabel,
}) => {

  useEffect(() => {
      //Logic goes here
      if(!statusOriginalColor) setColor("#B0B0B0")
    }, [statusOriginalColor]);
    
  const [color, setColor] = useState<string>(statusOriginalColor);

  const handleChangeComplete = (colorToChange: ColorResult) => {
    setColor(colorToChange.hex);
  };

  const sampleStyle = {
    backgroundColor: `${color}`,
  };

  return (
    <Form.Field error={touched && error} type={type} width={width}>
      <label>{inputLabel}</label>
      <div
        className="statusSampleCircle"
        style={sampleStyle}
        onClick={() => setSelectingColor(!selectingColor)}
      ></div>
      {selectingColor && (
        <div className="popOver">
          <SketchPicker
            disableAlpha
            presetColors={[]}
            color={color}
            onChangeComplete={(c) => input.onChange(c.hex)}
            onChange={handleChangeComplete}
          />
        </div>
      )}
      {touched && error && <Label>{error}</Label>}
    </Form.Field>
  );
};

export default ColorPicker;
