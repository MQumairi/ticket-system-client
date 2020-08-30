import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../Utility/Final Form Fields/TextInput";
import ColorPicker from "../../../Utility/Final Form Fields/ColorPicker";
import Store from "../../../App/Store/rootStore";
import { IStatus } from "../../../../Models/status";
import { combineValidators, isRequired } from "revalidate";

interface IProps {
  setAddingStatus: (addingStatus: boolean) => void;
}

const StatusAddForm: React.FC<IProps> = ({ setAddingStatus }) => {
  const store = useContext(Store);
  const { addStatus, loadStatuses } = store.statusStore;

  const [selectingColor, setSelectingColor] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState<boolean>(false);

  const validate = combineValidators({
    name: isRequired({ message: "A name is required" }),
    color: isRequired({message: "Select a color"})
  });

  const handleFinalFormSubmit = (values: any) => {
    setSubmitting(true);
    setSelectingColor(false);

    let statusToAdd: IStatus = {
      status_text: values.name,
      status_color: values.color,
      is_default: false,
    };
    console.log(statusToAdd);

    addStatus(statusToAdd)
      .then(() => {
        loadStatuses();
      })
      .then(() => {
        setSubmitting(false);
      })
      .then(() => {
        setAddingStatus(false);
      });
  };

  const handleCancel = () => {
    setSelectingColor(false);
    setAddingStatus(false);
  };

  return (
    <FinalForm
      validate={validate}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, invalid, pristine }) => {
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
              <Button
                disabled={invalid || pristine}
                loading={submitting}
                className="mainButton"
                type="submit"
              >
                Submit
              </Button>
              <Button className="mainButton" onClick={() => handleCancel()}>
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
