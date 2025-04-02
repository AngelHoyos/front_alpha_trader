import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";
import { CoinsTableProps } from "../../../../../models/Coins.model";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const CoinsTable: React.FC<CoinsTableProps> = ({ coins }) => {
  const [timeframe, setTimeframe] = useState("24h");

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "#0D0719", // Fondo oscuro
        color: "white",
        borderRadius: 2,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#3C1D68" }}> {/* Encabezado en color morado oscuro */}
            {["Nombre", "Precio", "Cambio", "Volumen en", "Cap. de mercado"].map((header) => (
              <TableCell key={header} sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>
                {header === "Volumen en" ? (
                  <span>
                    Volumen en {" "}
                    <Select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      sx={{
                        color: "white",
                        border: "none",

                        textAlign: "center",
                        height:'30px',
                        pl:'10px',
                        backgroundColor:'transparent',
                        fontSize: "inherit",
                        '.MuiSelect-select': { padding: 0 },
                      }}
                    //   variant="standard"
                    >
                      <MenuItem value="1h">1h</MenuItem>
                      <MenuItem value="24h">24h</MenuItem>
                      <MenuItem value="7d">7d</MenuItem>
                    </Select>
                  </span>
                ) : (
                  header
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
  {coins.map((coin) => (
    <TableRow key={coin.name} sx={{ bgcolor: "#0D0719", borderBottom: "1px solid #3C1D68" }}>
      <TableCell sx={{ color: "white", display: "flex", alignItems: "center", gap: 1 }}>
        <span style={{ fontSize: "1.2rem" }}>{coin.icon}</span>
        <span>{coin.name}</span>
      </TableCell>
      <TableCell sx={{ color: "white", textAlign: "center" }}>{coin.price}</TableCell>
      <TableCell
        sx={{
          color: coin.isPositive ? "#4CAF50" : "#E53935",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {coin.isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}
        {coin.change}
      </TableCell>
      <TableCell sx={{ color: "white", textAlign: "center" }}>
        {coin.volume[timeframe]} {/* Aquí se usa el período seleccionado */}
      </TableCell>
      <TableCell sx={{ color: "white", textAlign: "center" }}>{coin.marketCap}</TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default CoinsTable;
