import { LinkProps } from "react-router-dom";
import {
  Drawer,
  Box,
  ListItemButton,
  ListItemButtonProps,
} from "@mui/material";
import {  styled } from "@mui/system";

const drawerWidth = 250;

export const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
  width: open ? drawerWidth : 70,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 70,
    display:'flex',
    alignItems: open ? 'flex-start': "center" ,
    borderTopRightRadius:'15px',
    borderRight: "1px solid rgb(87, 23, 115)",
    boxSizing: "border-box",
    backgroundColor: "#000411",
    color: "white",
    overflow: "hidden",
  },
}));

export const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

type StyledListItemProps = ListItemButtonProps & Partial<LinkProps>;

export const StyledListItem = styled(ListItemButton)<StyledListItemProps>(
  () => ({
    color: "white",
    width: "240px",
    height: "53px",
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    marginBottom: "15px",
    fontSize: "20px",
    margin: "10px auto",
    gap: "12px",
    "&:hover": {
      backgroundColor: "rgba(87, 23, 115, 0.68)",
      borderRadius: "10px",
      color: "white",
    },
  })
);
export const IconWrapper = styled("div")({
  minWidth: "40px",
  display: "flex",
  fontSize: "19px",
  justifyContent: "center",
  alignItems: "center",
});
