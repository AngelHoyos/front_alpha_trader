import { Modal, Box, Typography } from "@mui/material";
import React from "react";
import ButtonCutoms from "../../Button/ButtonCutoms";

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
}
const ModalTermsConditions: React.FC<TermsModalProps> = ({
  open,
  onClose,
  onAccept,
}) => {
  const handleAccept = () => {
    onAccept();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
    <Box className="bg-[#000317] p-6 rounded-lg w-[50%] mx-auto mt-20 max-h-[80%] flex flex-col">
      <Typography variant="h6" className="text-white" sx={{fontWeight:800, mb:4}}>
        Términos y Condiciones
      </Typography>
  
      {/* Contenedor con scroll solo para el contenido */}
      <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 2 }}>
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>1. Introducción</strong>
          <br />
          Bienvenido a <strong>Alpha Trader</strong>, una plataforma que
          proporciona recomendaciones y análisis financieros a través de
          inteligencia artificial para el trading de criptomonedas, incluyendo
          Bitcoin. Antes de utilizar nuestros servicios, es fundamental que leas
          y aceptes estos Términos y Condiciones de Uso.
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>2. Naturaleza del Servicio</strong>
          <br />
          La Aplicación ofrece información y consejos basados en algoritmos de
          inteligencia artificial. Sin embargo,{" "}
          <strong>
            NO somos una entidad financiera ni ofrecemos asesoramiento de
            inversión personalizado.
          </strong>
          La información proporcionada es de carácter informativo y educativo.
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>3. Responsabilidad del Usuario</strong>
          <br />
          El usuario reconoce y acepta que:
          <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
            <li>Todas las decisiones de inversión son bajo su propio riesgo.</li>
            <li>
              Debe realizar su propia investigación y, si es necesario, consultar
              con un asesor financiero antes de tomar decisiones.
            </li>
            <li>
              La Aplicación no garantiza resultados ni rendimientos específicos en
              ninguna inversión.
            </li>
          </ul>
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>4. Exclusión de Responsabilidad</strong>
          <br />
          Alpha Trader y su equipo <strong>NO</strong> se hacen responsables de:
          <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
            <li>
              Pérdidas financieras resultantes del uso de la información
              proporcionada por la Aplicación.
            </li>
            <li>
              Cambios en el mercado, fluctuaciones de precios u otros factores
              externos que afecten las inversiones.
            </li>
            <li>
              Errores en los datos proporcionados por la inteligencia artificial.
            </li>
          </ul>
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>5. Uso Adecuado del Servicio</strong>
          <br />
          El usuario se compromete a:
          <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
            <li>No manipular ni hacer un uso indebido de la Aplicación.</li>
            <li>
              No utilizar la información para actividades ilegales o fraudulentas.
            </li>
            <li>No distribuir ni reproducir el contenido sin autorización.</li>
          </ul>
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>6. Modificaciones y Terminación del Servicio</strong>
          <br />
          Nos reservamos el derecho de modificar o discontinuar la Aplicación en
          cualquier momento sin previo aviso. Así mismo, estos Términos pueden
          cambiar y es responsabilidad del usuario revisarlos periódicamente.
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>7. Legislación Aplicable</strong>
          <br />
          Estos Términos y Condiciones se rigen por las leyes del país en el que
          se encuentra registrado el servicio. Cualquier disputa será resuelta en
          los tribunales competentes de dicha jurisdicción.
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          Al utilizar la Aplicación, confirmas que has leído, comprendido y
          aceptado estos Términos y Condiciones. Si no estás de acuerdo, por
          favor, no utilices nuestros servicios.
        </Typography>
  
        <Typography variant="body2" sx={{ mb: 4 }}>
          <strong>Contacto</strong>
          <br />
          Si tienes dudas o inquietudes, puedes comunicarte con nosotros a{" "}
          <strong>hoyosbolivara11@gmail.com</strong>.
        </Typography>
      </Box>
  
      <Box className="flex justify-end mt-5">
        <ButtonCutoms
          text="Aceptar"
          className="bg-[#5114A6]/80! hover:bg-[#3D0F7C]/90!"
          onClick={handleAccept}
        />
      </Box>
    </Box>
  </Modal>
  
  );
};

export default ModalTermsConditions;
