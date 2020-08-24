import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../../../Utility/Final Form Fields/TextInput";
import { Form as FinalForm, Field } from "react-final-form";
import Store from "../../../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { IStatus } from "../../../../../Models/status";
import ColorPicker from "../../../../Utility/Final Form Fields/ColorPicker";
import "./statusListCardEditForm.css";
import SelectInput from "../../../../Utility/Final Form Fields/DropdownInput";

interface IProps {
  status: IStatus;
  setEditingStatus: (editingStatus: boolean) => void;
}

const StatusListCardEditForm: React.FC<IProps> = ({
  status,
  setEditingStatus,
}) => {
  //States
  const store = useContext(Store);
  const { editStatus, statusIsDefaultOptions, loadStatuses } = store.statusStore;

  const [selectingColor, setSelectingColor] = useState<boolean>(false);

  //Form handler
  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
    setSelectingColor(false);

    let statusToEdit : IStatus = {
      status_text: values.name,
      status_color: values.color,
      is_default: values.is_default
    }

    editStatus(status.status_id!.toString(), statusToEdit)
    .then(() => {
      setEditingStatus(false);
    })
    .then(() => {
        loadStatuses();
      }
    );
  };

  const handleCancel = () => {
    setSelectingColor(false);
    setEditingStatus(false);
  };

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Field
                name="color"
                placeholder="Status name"
                component={ColorPicker}
                statusOriginalColor={status.status_color}
                selectingColor={selectingColor}
                setSelectingColor={setSelectingColor}
              />
              <div className="statusEditName">
              <Form.Group widths="equal">
                <Field
                  name="name"
                  placeholder="Status name"
                  component={TextInput}
                  initialValue={status.status_text}
                />
                <Field
                  component={SelectInput}
                  options={statusIsDefaultOptions}
                  name="is_default"
                  defaultValue={status?.is_default}
                />
                </Form.Group>
              </div>
              <Button.Group>
                <Button
                  className="mainButton cardEditButton"
                  type="submit"
                  content="Save"
                />
                <Button
                  className="mainButton cardDelButton"
                  type="submit"
                  content="Cancel"
                  onClick={() => handleCancel()}
                />
              </Button.Group>
            </Form.Group>
          </Form>
        );
      }}
    />
  );
};

export default observer(StatusListCardEditForm);
