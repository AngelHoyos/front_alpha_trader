import React, { useState } from "react";
import { CoinsCardProps } from "../../../../../models/Coins.model";
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
          </Card>
        </Fade>
      </Modal>
    </>
  );
};

export default MostProminentCurrency;
