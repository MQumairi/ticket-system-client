import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import SelectInput from "../../Utility/Final Form Fields/DropdownInput";
import Store from "../../App/Store/rootStore";
import { observer } from "mobx-react-lite";
import { IACPSettingsForm } from "../../../Models/acpSettings";
import "./acpSettingsList.css";

interface IProps {
  //List props here in the form:
  //propName: propType;
  setEditing: (editing: boolean) => void;
}

const ACPSettingsEdit: React.FC<IProps> = ({ setEditing }) => {
  const store = useContext(Store);
  const {
    ACPSettings,
    adminOptions,
    registrationOptions,
    editACPSettings,
  } = store.commonStore;

  const [sendingEdit, setSendingEdit] = useState<boolean>(false);

  const handleFinalFormSubmit = (values: any) => {
    setSendingEdit(true);
    let settingsToEdit: IACPSettingsForm = {
      founder_id: values.founder_id,
      registration_locked: values.registration_locked,
    };

    editACPSettings(settingsToEdit).then(() => {
      setSendingEdit(false);
      setEditing(false);
    });

    console.log(settingsToEdit);
  };

  return (
    <div className="acpSettingsListBody">
      <FinalForm
        onSubmit={handleFinalFormSubmit}
        render={({ handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Field
                component={SelectInput}
                options={adminOptions}
                name="founder_id"
                placeholder="Product"
                inputLabel="Founder"
                defaultValue={ACPSettings?.founder.id}
              />
              <Field
                component={SelectInput}
                options={registrationOptions}
                name="registration_locked"
                placeholder="Registration"
                inputLabel="Registration of New Users"
                defaultValue={ACPSettings?.registration_locked}
              />
              <hr />
              <div className="acpSettingsButtonGroup">
              <Button
                loading={sendingEdit}
                className="mainButton ticketNewSubmit"
                type="submit"
                content="Save"
              />
              <Button
                className="mainButton ticketNewSubmit"
                content="Cancel"
                onClick={() => setEditing(false)}
              />
              </div>
            </Form>
          );
        }}
      />
    </div>
  );
};

export default observer(ACPSettingsEdit);
