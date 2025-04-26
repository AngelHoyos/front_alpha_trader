import { useEffect, useState } from "react";
import FixedDrawer from "../../components/FixedDrawer/FixedDrawer";
import {
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Outlet } from "react-router-dom"; // Importamos Navigate para redirigir
import ModalNotication from "../../components/Modals/ModalNotification/ModalNotication";
import { Notification } from "../../models/Notification.model";
import { useDashboard } from "../../hooks/useDashboard";
import ModalProfilePreferences from "./components/ModalProfilePrefences/ModalProfilePreferences";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { isAuthorized } = useDashboard();
  const [notifications, setNotifications] = useState<Notification[]>([
    { title: "Nuevo Mensaje", message: "Tienes una nueva notificación." },
    { title: "Actualización", message: "Se ha actualizado tu perfil." },
  ]);
  const [openAccessModal, setOpenAccessModal] = useState<boolean>(false);

  const handleRemoveNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };
  useEffect(() => {
    if (isAuthorized === false) {
      setOpenAccessModal(true);
    }
  }, [isAuthorized]);

  if (isAuthorized === null) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)", // Fondo semitransparente
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="primary" size={50} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#000411",
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        overflowY: "auto",
      }}
    >
      <FixedDrawer />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "calc(100% - 50px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "11%",
            display: "flex",
            justifyContent: "end",
            margin: "auto",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", paddingRight: "15px" }}
          >
            <Button
              onClick={() => setOpen(true)}
              sx={{
                margin: "auto 8px",
                padding: "10px 6px",
                backgroundColor: "transparent",
                color: "white",
                "&:hover": { border: "unset" },
              }}
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
            </Button>
            <ModalNotication
              open={open}
              onClose={() => setOpen(false)}
              notifications={notifications}
              onRemoveNotification={handleRemoveNotification}
            />
          </Box>
        </Box>

        {/* Si el usuario está autorizado, renderizamos el Outlet */}
        <Box sx={{ width: "100%", height: "89%", boxShadow: "none" }}>
          <Outlet />
        </Box>
      </Box>
      {isAuthorized === false && (
        <ModalProfilePreferences
          open={openAccessModal}
          onClose={() => setOpenAccessModal(false)}
        />
      )}
    </Box>
  );
};

export default Dashboard;
