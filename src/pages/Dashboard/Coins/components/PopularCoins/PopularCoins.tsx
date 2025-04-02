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
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faTimes } from "@fortawesome/free-solid-svg-icons";

const cardStyles = {
  width: 350,
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
  height: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 550 },
  bgcolor: "#000317",
  color: "white",
  borderRadius: 3,
  boxShadow: 10,
  p: 3,
  maxHeight: "80vh",
  overflowY: "auto",
};

const PopularCoins: React.FC<CoinsCardProps> = ({ coins }) => {
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
              Favoritas
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
                <Typography variant="h5">{coin.icon}</Typography>
                <Typography variant="body1" sx={{ flex: 1, ml: 2 }}>
                  {coin.name}
                </Typography>
                <Typography variant="body2">{coin.price}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: coin.isPositive ? "#4CAF50" : "#E53935",
                    fontWeight: "bold",
                    ml: 2,
                  }}
                >
                  {coin.change}
                </Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Modal para mostrar todas las monedas destacadas con contador */}
      <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
        <Box sx={modalStyles}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="bold">
              Las más Populares ({coins.length})
            </Typography>
            <IconButton onClick={() => setOpen(false)} sx={{ color: "white" }}>
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
          </Box>
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
                <Typography variant="h5">{coin.icon}</Typography>
                <Typography variant="body1" sx={{ flex: 1, ml: 2 }}>
                  {coin.name}
                </Typography>
                <Typography variant="body2">{coin.price}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: coin.isPositive ? "#4CAF50" : "#E53935",
                    fontWeight: "bold",
                    ml: 2,
                  }}
                >
                  {coin.change}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default PopularCoins;
