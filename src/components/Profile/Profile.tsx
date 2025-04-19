import React, { useEffect } from "react";
import { Box, Snackbar, Alert, Button, Avatar, Typography } from "@mui/material";
import { useProfile } from "../../hooks/useProfile";
import { StyledTab, StyledTabs } from "./styled-component/Profile.styled";
import AccountStatus from "./components/AccountStatus/AccountStatus";
import RecentActivity from "./components/RecentActivity/RecentActivity";
import CoinPreferences from "./components/CoinPreferences/CoinPreferences";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { useAvailableCoinsProfile } from "../../hooks/useAvailableCoinsProfile";
import AnimateSVG from "./components/AnimateSVG/AnimateSVG";

const Profile: React.FC = () => {
  const {
    userData,
    handleChange,
    message,
    setMessage,
    handleSave,
    openModal,
    handleCoinPreferencesChange,
    handleEditClick,
    handleCloseModal,
  } = useProfile();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };
  const { getNameCoins, availableCoins } = useAvailableCoinsProfile();
  useEffect(() => {
    getNameCoins();
  }, []);
  const userTransactions = [
    {
      id: 1,
      date: "2025-03-31T14:25:00",
      description: "Compra de ítem",
      amount: -50,
      category: "Compra",
    },
    {
      id: 2,
      date: "2025-03-30T10:15:00",
      description: "Recompensa diaria",
      amount: 20,
      category: "Venta",
    },
    {
      id: 3,
      date: "2025-03-29T18:45:00",
      description: "Pago recibido",
      amount: 35,
      category: "Compra",
    },
  ];

  const cuenta = { total: 1000000, gastado: 2000000, restante: 1000000 };
  const historialCoins = [
    { id: 1, description: "Bitcoin", amount: 500, result: "ganancia" },
    { id: 2, description: "Ethereum", amount: 1200, result: "pérdida" },
    { id: 3, description: "Cardano", amount: 800, result: "ganancia" },
  ];

  return (
    <Box
      sx={{
        textAlign: "left",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "250px",
          position: "relative",
        }}
      >
        <AnimateSVG />
        <Box
          sx={{
            width: 220,
            height: 220,
            borderRadius: "24px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "-130px",
            left: "70px",
          }}
        >
          <Avatar
            src="/ruta/de/imagen.jpg"
            alt="Usuario"
            variant="rounded"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "24px",
              color: "black",
              backgroundColor: "#fff",
            }}
          />
          <Box>
            <Typography variant="h3"> Juan Hernandez </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          p: 3,
          pt: 10,
          boxShadow: "0 3px 12px 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ width: "100%", mb: 4 }}>
          <Box
            sx={{
              borderRadius: 3,
              p: 3,
              width: "100%",
              boxShadow: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              sx={{ mb: 2 }}
            >
              Editar Información
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <StyledTabs value={tabIndex} onChange={handleTabChange} centered>
            <StyledTab label="Estado de Cuenta" />
            <StyledTab label="Actividad Reciente" />
            <StyledTab label="Moneda Preferida" />
          </StyledTabs>
        </Box>

        {/* Contenido condicional de cada Tab */}
        {tabIndex === 0 && (
          <AccountStatus cuenta={cuenta} historyCoins={historialCoins} />
        )}
        {tabIndex === 1 && <RecentActivity transactions={userTransactions} />}
        {tabIndex === 2 && (
          <CoinPreferences
            selectedCoins={userData.coinsList ?? []}
            availableCoins={availableCoins}
            onChange={handleCoinPreferencesChange}
          />
        )}

        {/* Modal de edición de perfil */}
        <ProfileInfo
          userData={userData}
          handleSave={handleSave}
          handleChange={handleChange}
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />

        {/* Notificación */}
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
    </Box>
  );
};

export default Profile;
