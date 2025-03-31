import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { styled } from "styled-components";

// Estilizando Tabs
export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #5114A6; /* Color del indicador */
  }
`;

// Estilizando cada Tab
export const StyledTab = styled(Tab)`
  color: white !important;
  font-weight: normal;
  transition: all 0.3s ease;

  &.Mui-selected {
    color: white; /* Color cuando está seleccionado */
    font-weight: bold;
    
  }
      &:focus {
    outline: none;
  }
`;
