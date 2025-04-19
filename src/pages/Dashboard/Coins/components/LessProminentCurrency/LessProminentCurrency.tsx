import React, { useState } from "react";
import { CoinsCardProps } from "../../../../../models/Coins.model";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  Modal,
  Fade,
  Backdrop,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const cardStyles = {
  width: 400,
  bgcolor: "rgba(81,20,166,0.45)",
  border: "1px solid #5114A6",
  color: "white",
  borderRadius: 3,
  boxShadow: 6,
  height: 270,
  transition: "transform 0.3s ease-in-out",
  "&:hover": { transform: "scale(1.02)" },
};

const modalStyles = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 550 },
  bgcolor: "#000317",
  color: "white",
  borderRadius: 3,
  boxShadow: 10,
  p: 3,
  maxHeight: "80vh", // Altura máxima de la modal
  display: "flex",
  flexDirection: "column",
};

const contentStyles = {
  overflowY: "auto", // Habilita el scroll vertical cuando sea necesario
  flexGrow: 1, // Permite que el contenido ocupe el espacio disponible
};

const LessProminentCurrency: React.FC<CoinsCardProps> = ({ coins }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={cardStyles}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography sx={{ fontSize: "1.15rem" }} fontWeight="bold">
              Secundarias
            </Typography>
            <IconButton
              sx={{ color: "white", fontSize: "1rem" }}
              onClick={() => setOpen(true)}
            >
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </IconButton>
          </Box>

          <List>
            {coins.slice(0, 3).map((coin) => (
              <ListItem
                key={coin.binance_symbol}
                sx={{
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  mb: 1,
                  px: 1,
                }}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null; // evita loop infinito si la imagen por defecto también falla
                    e.currentTarget.src =
                      "https://via.placeholder.com/32?text=Coin"; // imagen por defecto
                  }}
                  style={{ width: 32, height: 32, borderRadius: 4 }}
                />
                <Typography variant="body1" sx={{ flex: 1, ml: 2 }}>
                  {coin.name}
                </Typography>
                <Typography variant="body2">{coin.current_price}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      coin.price_change_percentage_24h >= 0
                        ? "#4CAF50"
                        : "#E53935",
                    fontWeight: "bold",
                    ml: 2,
                  }}
                >
                  {coin.price_change_percentage_24h}%
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Modal con scroll habilitado */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Card sx={modalStyles}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Monedas Secundarias ({coins.length})
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </IconButton>
            </Box>

            {/* Contenedor con scroll */}
            <Box sx={contentStyles}>
              <List>
                {coins.map((coin) => (
                  <ListItem
                    key={coin.name}
                    sx={{
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      py: 1,
                      backgroundColor: "rgba(255,255,255,0.1)",
                      mb: 1,
                      px: 1,
                    }}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null; // evita loop infinito si la imagen por defecto también falla
                        e.currentTarget.src =
                          "https://via.placeholder.com/32?text=Coin"; // imagen por defecto
                      }}
                      style={{ width: 32, height: 32, borderRadius: 4 }}
                    />
                    <Typography variant="body1" sx={{ flex: 1, ml: 2 }}>
                      {coin.name}
                    </Typography>
                    <Typography variant="body2">
                      {coin.current_price}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          coin.price_change_percentage_24h >= 0
                            ? "#4CAF50"
                            : "#E53935",
                        fontWeight: "bold",
                        ml: 2,
                      }}
                    >
                      {coin.price_change_percentage_24h}%
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default LessProminentCurrency;
