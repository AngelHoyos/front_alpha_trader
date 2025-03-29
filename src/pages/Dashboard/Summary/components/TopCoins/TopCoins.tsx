import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {TopCoinsProps, Coin} from "../../../../../models/TopCoins";
const TopCoins: React.FC<TopCoinsProps> = ({ coinsData }) => {
  return (
    <Card
      sx={{
        width: "90%",
        background: "rgba(87,23,115,0.51)",
        border: "1px solid #571773",
        borderRadius: "12px",
        p: 2,
        color: "white",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", mb: 2, textAlign: "left", ml: "10px" }}
      >
        Top de Coins
      </Typography>
      {coinsData.map((coin) => (
        <Box
          key={coin.id}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "8px",
            p: 1.2,
            mb: 1,
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(81,20,166,0.45)",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "20px" }}>{coin.icon}</Typography>
            <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
              {coin.moneda}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: coin.estado === "subió" ? "#069F2F" : "#D55F5A",
              }}
            >
              {coin.valor}
            </Typography>
            <FontAwesomeIcon
              icon={coin.iconEstado}
              color={coin.estado === "subió" ? "#069F2F" : "#D55F5A"}
              style={{
                transform: `rotate(${coin.estado === "subió" ? 45 : -45}deg)`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Card>
  );
};

export default TopCoins;
