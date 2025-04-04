import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const CryptoConverter = () => {
  const [fromCurrency, setFromCurrency] = useState<string>("btc");
  const [toCurrency, setToCurrency] = useState<string>("usd");
  const [amount, setAmount] = useState<string>("0.051244");
  const [convertedAmount, setConvertedAmount] = useState<string>("34,900");

  return (
    <Card
      sx={{
        padding: 3,
        background: "rgba(81,20,166,0.45)",
        borderRadius: 3,
        textAlign: "center",
        maxWidth: 400,
        margin: "auto",
        marginTop: "30px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
        color: "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Conversor
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
          }}
        >
          <Select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            sx={{
              minWidth: 130,
              height: 45,
              borderRadius: 2,
              backgroundColor: "#5114A6",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="btc">🔶 Bitcoin</MenuItem>
            <MenuItem value="eth">🌐 Ethereum</MenuItem>
            <MenuItem value="usdt">💲 USDT</MenuItem>
          </Select>

          <TextField
            type="number"
            fullWidth
            value={amount}
            variant="outlined"
            onChange={(e) => setAmount(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#2A1055",
                color: "white",
                fontWeight: "bold",
                "& fieldset": {
                  borderColor: "#9D70F9",
                },
              },
            }}
          />
        </div>

        <Typography variant="h5" fontWeight="bold" color="#C5A3FF">
          =
        </Typography>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 16,
          }}
        >
          <Select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            sx={{
              minWidth: 130,
              height: 45,
              borderRadius: 2,
              backgroundColor: "#5114A6",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <MenuItem value="usd">💲 Dollar</MenuItem>
            <MenuItem value="eur">💶 Euro</MenuItem>
            <MenuItem value="cop">🇨🇴 COP</MenuItem>
          </Select>

          <TextField
            fullWidth
            disabled
            value={convertedAmount}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "#2A1055",
                fontWeight: "bold",
                "& fieldset": {
                  borderColor: "#9D70F9", 
                },
              },
              "& .MuiOutlinedInput-root.Mui-disabled": {
                "& fieldset": {
                  borderColor: "#7B3FE4 !important", 
                },
              },
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "white", 
                opacity: 1,
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoConverter;
