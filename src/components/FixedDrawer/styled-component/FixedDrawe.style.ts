import { Drawer, Box, ListItemButton } from "@mui/material";
import { styled } from "@mui/system";

const drawerWidth = 240;

export const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#000317",
    color: "white",
  },
});

export const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

export const StyledListItem = styled(ListItemButton)<{to?:string}>({
  color: "white",
  display: "flex",
  alignItems: "center",
  gap: "12px", // Espacio entre icono y texto
  "&:hover": {
    backgroundColor: "#5114A6",
  },
});

export const IconWrapper = styled("div")({
  minWidth: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
