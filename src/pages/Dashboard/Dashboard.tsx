import  { useState } from "react";
import FixedDrawer from "../../components/FixedDrawer/FixedDrawer";
import { Box, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import { useNavigates } from "../../hooks/useNavigates";
import { Outlet, useLocation } from "react-router-dom";
import ModalNotication from "../../components/Modals/ModalNotification/ModalNotication";
import { Notification } from "../../models/Notification.model";
const Dashboard = () => {
  const { goTo } = useNavigates();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { title: "Nuevo Mensaje", message: "Tienes una nueva notificación." },
    { title: "Actualización", message: "Se ha actualizado tu perfil." },
  ]);

  const handleRemoveNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };
  const mostrarButton = location.pathname === "/dashboard/coin";
  return (
    <Box
      sx={{
        backgroundColor: "#000317",
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
          width: "87%",
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
            {mostrarButton && (
              <Button
                onClick={() => goTo("summary")}
                sx={{
                  margin: "auto 8px",
                  padding: "10px 6px",
                  backgroundColor: "rgba(87, 23, 115,0.51)",
                  color: "white",
                  border: "1px solid #571773",
                  "&:hover": { border: "1px solid #5114A6" },
                }}
              >
                <FontAwesomeIcon
                  icon={faMoneyBillTransfer}
                  className="text-xl"
                />
              </Button>
            )}
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
        <Box sx={{ width: "100%", height: "89%" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
