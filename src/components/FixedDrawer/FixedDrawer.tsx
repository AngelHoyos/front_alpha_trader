import React from "react";
import {
  IconWrapper,
  StyledDrawer,
  StyledListItem,
} from "./styled-component/FixedDrawe.style";
import { List, ListItemText, Toolbar } from "@mui/material";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
interface MenuItem {
    text: string;
    icon: any; 
    path: string;
  }
const menuItems: MenuItem[] = [{ text: "Inicio", icon: faHouse, path: "/login" }];
const FixedDrawer: React.FC = () => {
  return (
    <div className="flex">
      <StyledDrawer variant="permanent">
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <StyledListItem key={item.text} as={Link} to={item.path}>
              <IconWrapper>
                <FontAwesomeIcon icon={item.icon} size="lg" />
              </IconWrapper>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
    </div>
  );
};

export default FixedDrawer;
