import { Modal, Box, Typography, Backdrop, Fade } from "@mui/material";
import React from "react";
import ButtonCutoms from "../../Button/ButtonCutoms";
import { TermsModalProps } from "../../../models/TermsConditions.model";

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
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open} timeout={500}>
        <Box className="bg-[#000317] p-6 rounded-lg w-[50%] mx-auto mt-20 max-h-[80%] flex flex-col">
          <Typography
            variant="h6"
            className="text-white"
            sx={{ fontWeight: 800, mb: 4 }}
          >
            Términos y Condiciones
          </Typography>

          <Box sx={{ maxHeight: "60vh", overflowY: "auto", pr: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>1. Introducción</strong>
              <br />
              Bienvenido a <strong>Alpha Trader</strong>, una plataforma que
              proporciona recomendaciones y análisis financieros a través de
              inteligencia artificial para el trading de criptomonedas,
              incluyendo Bitcoin. Antes de utilizar nuestros servicios, es
              fundamental que leas y aceptes estos Términos y Condiciones de
              Uso.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>2. Naturaleza del Servicio</strong>
              <br />
              La Aplicación ofrece información y consejos basados en algoritmos
              de inteligencia artificial. Sin embargo,{" "}
              <strong>
                NO somos una entidad financiera ni ofrecemos asesoramiento de
                inversión personalizado.
              </strong>{" "}
              La información proporcionada es de carácter informativo y
              educativo.
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>3. Responsabilidad del Usuario</strong>
              <br />
              El usuario reconoce y acepta que:
            </Typography>
            <ul style={{ paddingLeft: "20px", marginBottom: "1.5rem" }}>
              <li>
                <Typography variant="body2">
                  Todas las decisiones de inversión son bajo su propio riesgo.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Debe realizar su propia investigación y, si es necesario,
                  consultar con un asesor financiero antes de tomar decisiones.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  La Aplicación no garantiza resultados ni rendimientos
                  específicos en ninguna inversión.
                </Typography>
              </li>
            </ul>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>4. Exclusión de Responsabilidad</strong>
              <br />
              Alpha Trader y su equipo <strong>NO</strong> se hacen responsables
              de:
            </Typography>
            <ul style={{ paddingLeft: "20px", marginBottom: "1.5rem" }}>
              <li>
                <Typography variant="body2">
                  Pérdidas financieras resultantes del uso de la información
                  proporcionada por la Aplicación.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Cambios en el mercado, fluctuaciones de precios u otros
                  factores externos que afecten las inversiones.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Errores en los datos proporcionados por la inteligencia
                  artificial.
                </Typography>
              </li>
            </ul>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>5. Uso Adecuado del Servicio</strong>
              <br />
              El usuario se compromete a:
            </Typography>
            <ul style={{ paddingLeft: "20px", marginBottom: "1.5rem" }}>
              <li>
                <Typography variant="body2">
                  No manipular ni hacer un uso indebido de la Aplicación.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  No utilizar la información para actividades ilegales o
                  fraudulentas.
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  No distribuir ni reproducir el contenido sin autorización.
                </Typography>
              </li>
            </ul>

            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>6. Modificaciones y Terminación del Servicio</strong>
              <br />
              Nos reservamos el derecho de modificar o discontinuar la
              Aplicación en cualquier momento sin previo aviso. Así mismo, estos
              Términos pueden cambiar y es responsabilidad del usuario
              revisarlos periódicamente.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              <strong>7. Legislación Aplicable</strong>
              <br />
              Estos Términos y Condiciones se rigen por las leyes del país en el
              que se encuentra registrado el servicio. Cualquier disputa será
              resuelta en los tribunales competentes de dicha jurisdicción.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
              Al utilizar la Aplicación, confirmas que has leído, comprendido y
              aceptado estos Términos y Condiciones. Si no estás de acuerdo, por
              favor, no utilices nuestros servicios.
            </Typography>

            <Typography variant="body2" sx={{ mb: 2 }}>
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
      </Fade>
    </Modal>
  );
};

export default ModalTermsConditions;
