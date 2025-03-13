import { ButtonCustomProps } from "../../models/ButtomCustom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonCustom } from "./styled-component/ButtomCustom.style";

const ButtonCutoms: React.FC<ButtonCustomProps> = ({
  className,
  text,
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
}) => {
  return (
    <ButtonCustom
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      className={className}
    >
      {icon && <FontAwesomeIcon icon={icon} />}{" "}
      {/* Renderiza el ícono si existe */}
      {text}
    </ButtonCustom>
  );
};

export default ButtonCutoms;
