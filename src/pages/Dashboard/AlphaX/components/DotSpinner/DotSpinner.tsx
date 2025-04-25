import React from "react";
import "./DotSpinner.css"; // Asegúrate de tener este CSS o insertar el estilo en línea si prefieres

const DotSpinner: React.FC = () => {
  return (
    <div className="spinner">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default DotSpinner;
