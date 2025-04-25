import { useState } from "react";
import { Coins, CoinsCardProps } from "../../../../../models/Coins.model";
import {
  Card,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const MostProminentCurrency: React.FC<CoinsCardProps> = ({ coins }) => {
  const [open, setOpen] = useState(false);

  if (!coins.length) return null;

  return (
    <>
      <Card
        sx={{
          width: 400,
          bgcolor: "rgba(81,20,166,0.45)",
          border: "1px solid #5114A6",
          color: "white",
          borderRadius: 3,
          boxShadow: 6,
          height: 270,
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
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
              Principales
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
                <motion.span
                  key={coin.current_price}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    fontSize: ".95rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.00938em",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                    {coin.current_price.toFixed(2)}
                    </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    color:
                      coin.price_change_percentage_24h >= 0
                        ? "#4CAF50"
                        : "#E53935",
                    fontWeight: "bold",
                    marginLeft: 8,
                    fontSize: ".95rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.00938em",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                >
                  {Math.round(coin.price_change_percentage_24h * 100) / 100}%
                </motion.span>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.7)" },
        }}
      >
        <Fade in={open}>
          <Card
            sx={{
              width: { xs: "90%", sm: 550 },
              bgcolor: "#000317",
              color: "white",
              borderRadius: 3,
              boxShadow: 10,
              p: 3,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                Las mas Destacadas ({coins.length})
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{ color: "white" }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </IconButton>
            </Box>
            <List>
              {coins.map((coin) => (
                <ListItem
                  key={coin.name}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1,
                    backgroundColor: "rgba(255,255,255,0.1)",
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
                  <motion.span
                    key={coin.current_price}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: ".95rem",
                      lineHeight: 1.5,
                      letterSpacing: "0.00938em",
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                  >
                    {coin.current_price.toFixed(2)}
                  </motion.span>

                  <motion.span
                    key={coin.price_change_percentage_24h}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color:
                        coin.price_change_percentage_24h >= 0
                          ? "#4CAF50"
                          : "#E53935",
                      fontWeight: "bold",
                      marginLeft: 8,
                      fontSize: ".95rem",
                      lineHeight: 1.5,
                      letterSpacing: "0.00938em",
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                  >
                  {Math.round(coin.price_change_percentage_24h * 100) / 100}%
                  </motion.span>
                </ListItem>
              ))}
            </List>
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default MostProminentCurrency;
