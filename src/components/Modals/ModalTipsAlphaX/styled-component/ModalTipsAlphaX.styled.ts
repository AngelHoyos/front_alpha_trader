import styled from "@emotion/styled";
import { Card, IconButton } from "@mui/material";

export const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 900px;
  background-color:#000317;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
  padding: 24px;
  border-radius: 12px;
  position: relative;
  max-height: 80vh;
  overflow-y: auto;
`;

export const CloseModalButton = styled(IconButton)`
  position: absolute;
  right: 12px;
  top: 12px;
  color: rgba(255, 255, 255, 0.6);
  background-color: rgba(0, 0, 0, 0.04);
  width: 32px;
  height: 32px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const TipCard = styled(Card)`
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  position: relative;
  z-index: 0;

  &:hover {
    &::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      z-index: -1;
    }
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;
