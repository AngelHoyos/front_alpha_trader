import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import { ProfileInfoProps } from "../../../../models/Profile.model";
import UserInfoTab from "./components/UserInfo/UserInfo";
import ExampleTab from "./components/PreferencesQuestionnaire/PreferencesQuestionnaire";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userData,
  openModal,
  handleCloseModal,
}) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#000317",
          color: "#fff",
          borderRadius: "8px",
          boxShadow: 24,
        },
      }}
    >
      <DialogTitle>Actualizar Información del Usuario</DialogTitle>

      <DialogContent sx={{ backgroundColor: "#5114A6", pt: 0 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          TabIndicatorProps={{ style: { backgroundColor: "#fff" } }}
        >
          <Tab label="Información" />
          <Tab label="Ejemplo" />
        </Tabs>

        {tabIndex === 0 && (
          <UserInfoTab initialData={userData}  />
        )}
        {tabIndex === 1 && <ExampleTab />}
      </DialogContent>

      <DialogActions
        sx={{ backgroundColor: "#5114A6", opacity: 0.45 }}
      ></DialogActions>
    </Dialog>
  );
};

export default ProfileInfo;
