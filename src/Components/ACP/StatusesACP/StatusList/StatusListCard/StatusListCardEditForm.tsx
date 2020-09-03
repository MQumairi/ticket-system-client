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
import { combineValidators, isRequired } from "revalidate";

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
  const {
    editStatus,
    statusIsDefaultOptions,
    loadStatuses,
  } = store.statusStore;

  const [selectingColor, setSelectingColor] = useState<boolean>(false);

  const [editing, setEditing] = useState<boolean>(false);

  const validate = combineValidators({
    name: isRequired({ message: "A name is required" }),
  });

  //Form handler
  const handleFinalFormSubmit = (values: any) => {
    setEditing(true);
    setSelectingColor(false);

    let statusToEdit: IStatus = {
      status_text: values.name,
      status_color: values.color,
      is_default: values.is_default,
    };

    editStatus(status.status_id!.toString(), statusToEdit)
      .then(() => {
        loadStatuses();
      })
      .then(() => {
        status.status_text = statusToEdit.status_text;
        status.status_color = statusToEdit.status_color;
        status.is_default = statusToEdit.is_default;
      })
      .then(() => {
        setEditing(false);
      })
      .then(() => {
        setEditingStatus(false);
      });
  };

  const handleCancel = () => {
    setSelectingColor(false);
    setEditingStatus(false);
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
                    disabled={status?.is_default}
                  />
                </Form.Group>
              </div>
              <Button.Group>
                <Button
                  disabled={invalid || pristine || editing}
                  className="mainButton cardEditButton"
                  type="submit"
                  content="Save"
                  loading={editing}
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
