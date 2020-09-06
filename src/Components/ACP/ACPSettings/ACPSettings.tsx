import React, { useState } from "react";
import ACPSettingsList from "./ACPSettingsList";
import ACPSettingsEdit from "./ACPSettingsEdit";
import AdminPanel from "../AdminPanel";

const ACPSettings = () => {

  const [editing, setEditing] = useState<boolean>(false);

  return (
    <AdminPanel currentPage="Settings">
      {!editing && <ACPSettingsList setEditing={setEditing} />}
      {editing && <ACPSettingsEdit setEditing={setEditing} />}
    </AdminPanel>
  );
};

export default ACPSettings;
