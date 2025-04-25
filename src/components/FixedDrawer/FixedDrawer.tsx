import React, { useState } from "react";
import {
  IconWrapper,
  StyledDrawer,
  StyledListItem,
} from "./styled-component/FixedDrawe.style";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  faHouse,
  faMagnifyingGlassChart,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as RouterLink } from "react-router-dom";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { useNavigates } from "../../hooks/useNavigates";
import { MenuItem } from "../../models/MenuFixedDrawer..model";
import { logoutUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const menuItems: MenuItem[] = [
  { text: "Inicio", icon: faHouse, path: "/summary" },
  { text: "Coins", icon: faBitcoin, path: "/coin" },
  { text: "Alpha X", icon: faMagnifyingGlassChart, path: "/Alpha_X" },
];

const FixedDrawer: React.FC = () => {
  const { goTo, goToLogin } = useNavigates();
  const [open, setOpen] = useState(true);

  const { userData } = useAuth();
  const handleLogout = () => {
    logoutUser();
    goToLogin();
  };

  return (
    <div className="flex">
      <StyledDrawer
        variant="permanent"
        open={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: open ? "flex-start" : "center",
            borderBottom: open ? "1px solid rgb(87, 23, 115)" : "none",
            padding: "15px 0 15px 0",
            // gap: 1,
          }}
        >
          <Avatar
            alt={userData?.fullName}
            src={userData?.profilePicture}
            onClick={() => goTo("profile")}
            sx={{
              width: 50,
              height: 50,
              cursor: "pointer",
              marginLeft: open ? "15px" : "auto",
              marginRight: open ? "5px" : "auto",
            }}
          />
          {open && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", whiteSpace: "nowrap", marginLeft: 1 }}
            >
              {userData?.fullName}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {/* Lista de navegación */}
          <List>
            {menuItems.map((item) => (
              <StyledListItem
                key={item.text}
                component={RouterLink}
                to={"/dashboard" + item.path}
                sx={{
                  justifyContent: open ? "flex-start" : "center",
                  px: open ? 2 : 1,
                  cursor: "pointer",
                }}
              >
                <IconWrapper>
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </IconWrapper>
                {open && (
                  <ListItemText
                    primary={<Typography variant="h6">{item.text}</Typography>}
                  />
                )}
              </StyledListItem>
            ))}
          </List>

          {/* Botón de cerrar sesión */}
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleLogout}
              startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
              sx={{
                color: "white",
                textTransform: "none",
                border: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                justifyContent: open ? "flex-start" : "center",
                "& .MuiButton-startIcon": {
                  marginRight: open ? 1 : 0,
                },
                "&:hover": {
                  backgroundColor: "#7f0000",
                },
              }}
            >
              {open && "Cerrar Sesión"}
            </Button>
          </Box>
        </Box>
      </StyledDrawer>
    </div>
  );
};

export default FixedDrawer;
