import React from "react";
import { Card, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Coin } from "../../../../../models/TopCoins"; // Adjust the path as needed

export interface TopCoinsProps {
  coinsData: Coin[];
}

const TopCoins: React.FC<TopCoinsProps> = ({ coinsData }) => {
  const getTrendStyle = (trend24h: "bullish" | "bearish" | "neutral") => {
    switch (trend24h) {
      case "bullish":
        return { color: "#069F2F", icon: faArrowUp }; // Green color, Up arrow
      case "bearish":
        return { color: "#D55F5A", icon: faArrowDown }; // Red color, Down arrow
      case "neutral":
      default:
        return { color: "grey", icon: faMinus }; // Grey color, Minus sign
    }
  };

  return (
    <Card
      sx={{
        width: "90%",
        background: "rgba(87,23,115,0.51)",
        border: "1px solid #571773",
        borderRadius: "12px",
        p: 2, // Keep padding on the main card
        color: "white",
        display: "flex", // Added for better height control if needed
        flexDirection: "column", // Stack title and list vertically
        // Optional: Set a max-height for the card itself if desired
        // maxHeight: '500px',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 2, // Keep margin bottom for spacing
          textAlign: "left",
          ml: "10px",
          flexShrink: 0, // Prevent title from shrinking
        }}
      >
        Top de Coins
      </Typography>

      {/* Scrollable Container for the coin list */}
      <Box
        sx={{
          overflowY: "auto", // Enable vertical scrolling only when needed
          maxHeight: "00px", // Define a max height for the list area (adjust as needed)
          // Add some padding to the right to prevent scrollbar overlap if needed
          pr: 1, // Padding right for scrollbar spacing
          // Ensure the box grows if content is less than maxHeight but card has space
          flexGrow: 1,
          // Minor adjustment to prevent inner padding issues with scrollbar
          mr: -1, // Counteract the pr: 1 slightly if using default scrollbars
        }}
      >
        {coinsData.map((coin) => {
          const trendStyle = getTrendStyle(
            coin.trend24h as "bullish" | "bearish" | "neutral"
          );
          return (
            <Box
              key={coin.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "8px",
                // Adjust padding inside list items if needed, removed horizontal padding from parent
                p: "10px 0px", // Padding top/bottom, no horizontal padding here
                pl: "10px", // Use left padding to align with title
                mb: 1,
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(81,20,166,0.45)",
                },
              }}
            >
              {/* Left side: Image and Name */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <img
                  src={coin.image}
                  alt={coin.name}
                  style={{ width: "24px", height: "24px", borderRadius: "50%" }}
                />
                <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  {coin.name}
                </Typography>
              </Box>

              {/* Right side: Price and Trend Icon */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  pr: "10px",
                }}
              >
                {" "}
                {/* Add padding right here */}
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: trendStyle.color,
                  }}
                >
                  {`$${coin.currentPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Typography>
                <FontAwesomeIcon
                  icon={trendStyle.icon}
                  color={trendStyle.color}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Card>
  );
};

export default TopCoins;
