import React, { useEffect } from "react";
import {
  Box,
  Snackbar,
  Alert,
  Button,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useProfile } from "../../hooks/useProfile";
import { StyledTab, StyledTabs } from "./styled-component/Profile.styled";
import AccountStatus from "./components/AccountStatus/AccountStatus";
import RecentActivity from "./components/RecentActivity/RecentActivity";
import CoinPreferences from "./components/CoinPreferences/CoinPreferences";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import { useAvailableCoinsProfile } from "../../hooks/useAvailableCoinsProfile";
import AnimateSVG from "./components/AnimateSVG/AnimateSVG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

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
    loading,
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
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
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
        }}
      >
        <AnimateSVG />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 4,
          mt: -10,
        }}
      >
        <Box
          sx={{
            width: 220,
            height: 220,
            borderRadius: "24px",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: "-20px",
          }}
        >
          <Avatar
            src={userData?.profilePicture}
            alt={userData?.FullName}
            variant="rounded"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "24px",
              color: "black",
              backgroundColor: "#fff",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: "50px",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {userData?.FullName}
          </Typography>
          <Box
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              marginLeft: "10px",
            }}
          >
            <Button
              onClick={handleEditClick}
              sx={{
                mb: 2,
                minWidth: 0,
                width: 48,
                height: 48,
                borderRadius: "50%",
                padding: 0,
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#5114A6",
                },
                "&:active": {
                  boxShadow: "0 0 0 4px rgba(25, 118, 210, 0.3)",
                },
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
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
            selectedCoins={userData?.coinsList ?? []}
            availableCoins={availableCoins}
            onChange={handleCoinPreferencesChange}
          />
        )}

        {userData && (
          <ProfileInfo
            userData={userData}
            handleSave={handleSave}
            handleChange={handleChange}
            openModal={openModal}
            handleCloseModal={handleCloseModal}
          />
        )}

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
