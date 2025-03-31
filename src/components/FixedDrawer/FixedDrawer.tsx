import React from "react";
import {
  IconWrapper,
  StyledDrawer,
  StyledListItem,
} from "./styled-component/FixedDrawe.style";
import {
  Avatar,
  Box,
  List,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  faHouse,
  faMagnifyingGlassChart,
  faMoon,
  faRightFromBracket,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { useNavigates } from "../../hooks/useNavigates";
import { MenuItem } from "../../models/MenuFixedDrawer..model";

const menuItems: MenuItem[] = [
  { text: "Inicio", icon: faHouse, path: "/summary" },
  { text: "Cartera", icon: faWallet, path: "/wallet" },
  { text: "Coins", icon: faBitcoin, path: "/coin" },
  { text: "Alpha X", icon: faMagnifyingGlassChart, path: "/login" },
];
const menuItemsDos: MenuItem[] = [
  { text: "Cerrar Sesion", icon: faRightFromBracket },
];
const FixedDrawer: React.FC = () => {
  const { goTo } = useNavigates();
  return (
    <div className="flex">
      <StyledDrawer variant="permanent">
        <Box
          sx={{
            width: 240,
            my: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "2px solid rgb(87, 23, 115)",
            margin: "auto",
            padding: "25px 0 ",
          }}
        >
          <Avatar
            alt="Usuario"
            onClick={() => goTo("profile")}
            sx={{
              width: 50,
              height: 50,
              margin: "0 auto",
              marginLeft: "15px",
              marginRight: "5px",
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{ mt: 1, marginLeft: "5px", fontWeight: "bold" }}
          >
            Juan Hernandez
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <List
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {menuItems.map((item) => (
              <StyledListItem
                key={item.text}
                component={Link}
                to={"/dashboard" + item.path}
                sx={{ paddingLeft: "12px", cursor: "pointer" }}
              >
                <IconWrapper>
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </IconWrapper>
                <ListItemText
                  primary={<Typography variant="h6">{item.text} </Typography>}
                />
              </StyledListItem>
            ))}
          </List>
          <List>
            {menuItemsDos.map((item) => (
              <StyledListItem
                key={item.text}
                sx={{
                  "&:hover": {
                    backgroundColor: "#B71C1C",
                  },
                }}
              >
                <IconWrapper>
                  <FontAwesomeIcon icon={item.icon} size="lg" />
                </IconWrapper>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
                      {item.text}{" "}
                    </Typography>
                  }
                />
              </StyledListItem>
            ))}
          </List>
        </Box>
      </StyledDrawer>
    </div>
  );
};

export default FixedDrawer;
