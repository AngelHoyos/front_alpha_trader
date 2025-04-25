import React from "react";
import { Box, Typography } from "@mui/material";

const ExampleTab: React.FC = () => {
  return (
    <Box p={4} color="#fff">
      <Typography variant="h6" gutterBottom>
        Contenido de Ejemplo
      </Typography>
      <Typography>
        Aquí puedes colocar cualquier otro componente o sección relacionada con la configuración del perfil.
      </Typography>
    </Box>
  );
};

export default ExampleTab;
