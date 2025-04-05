import React, { useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useProfile } from "../../hooks/useProfile";
import { StyledTab, StyledTabs } from "./styled-component/Profile.styled";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import AccountStatus from "./components/AccountStatus/AccountStatus";
import RecentActivity from "./components/RecentActivity/RecentActivity";

const Profile: React.FC = () => {
  const { userData, handleChange, message, setMessage, handleSave } =
    useProfile();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const userTransactions = [
    { id: 1, date: "2025-03-31T14:25:00", description: "Compra de ítem", amount: -50, category: "Compra"  },
    { id: 2, date: "2025-03-30T10:15:00", description: "Recompensa diaria", amount: 20, category: "Venta" },
    { id: 3, date: "2025-03-29T18:45:00", description: "Pago recibido", amount: 35, category: "Compra"},
  ];

  const cuenta = { total: 1000000, gastado: 2000000, restante: 1000000 };
  const historialCoins = [
    { id: 1, description: "Bitcoin", amount: 500, result: "ganancia" },
    { id: 2, description: "Ethereum", amount: 1200, result: "pérdida" },
    { id: 3, description: "Cardano", amount: 800, result: "ganancia" },
  ];
  return (
    <Box sx={{ textAlign: "left", p: 3, width: "100%" }}>
      <Box sx={{ margin: "auto", width: "100%" }}>
        <StyledTabs value={tabIndex} onChange={handleTabChange} centered>
          <StyledTab label="Perfil" />
          <StyledTab label="Estado de Cuenta" />
          <StyledTab label="Actividad Reciente" />
        </StyledTabs>
      </Box>

      {tabIndex === 0 && (
        <ProfileInfo
          userData={userData}
          handleSave={handleSave}
          handleChange={handleChange}
        />
      )}
      {tabIndex === 1 && <AccountStatus cuenta={cuenta} historyCoins={historialCoins} />}
      {tabIndex === 2 && <RecentActivity transactions={userTransactions}/>}

      <Snackbar
        open={!!message.text}
        autoHideDuration={3000}
        onClose={() => setMessage({ text: "", type: "" })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setMessage({ text: "", type: "" })}
          severity={message.type as "success" | "error"}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
