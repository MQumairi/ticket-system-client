import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import ColorPicker from "../../../Utility/Final Form Fields/ColorPicker";
import Store from "../../../App/Store/rootStore";
import { IStatus } from "../../../../Models/status";

interface IProps {
  setAddingStatus: (addingStatus: boolean) => void;
}

const StatusAddForm: React.FC<IProps> = ({ setAddingStatus }) => {

    const store = useContext(Store);
    const {addStatus} = store.statusStore;

    const [selectingColor, setSelectingColor] = useState<boolean>(false);

    
  const handleFinalFormSubmit = (values: any) => {
    setSelectingColor(false);

    let statusToAdd: IStatus = {
      status_text: values.name,
      status_color: values.color,
      is_default: false
    }
    console.log(statusToAdd);

    addStatus(statusToAdd).then(() => {
      setAddingStatus(false);
    })
  };

  const handleCancel = () => {
    setSelectingColor(false);
    setAddingStatus(false);
  }

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Field
                name="color"
                placeholder="Status Color"
                component={ColorPicker}
                selectingColor={selectingColor}
                setSelectingColor={setSelectingColor}
              />
              <div className="statusAddName">
              <Field
                name="name"
                placeholder="Status name"
                component={TextInput}
              />
              </div>
              <Button className="mainButton" type="submit">
                Submit
              </Button>
              <Button
                className="mainButton"
                onClick={() =>handleCancel() }
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        );
      }}
    />
  );
};

export default StatusAddForm;
