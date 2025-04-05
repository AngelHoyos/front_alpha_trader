import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Estilos personalizados del botón
export const ButtonCustom = styled(Button)`
  background-color: #5114A6;
  opacity:0.8;
  color: white;
  font-size: 16px;
  font-weight: bold;
  text-transform: none;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px; /* Espacio entre ícono y texto */
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #3D0F7C;
  }

  &:disabled {
    background-color: #b0bec5;
    color: #ffffff;
  }

  svg {
    font-size: 22px; /* Tamaño del ícono */
  }
`;
