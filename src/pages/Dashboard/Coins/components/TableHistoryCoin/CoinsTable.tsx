import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useNavigates } from "../../../../../hooks/useNavigates";
import { CoinsTableProps } from "../../../../../models/Coins.model";

const CoinsTable: React.FC<CoinsTableProps> = ({ coins, show }) => {
  const [timeframe, setTimeframe] = useState("24h");
  const { goTo } = useNavigates();

  const headers = show
    ? ["Fecha", "Precio", "Cambio", "Volumen en"]
    : ["Nombre", "Precio", "Cambio", "Volumen en", "Cap. de mercado"];

  return (
    <TableContainer
      component={Paper}
      sx={{
        bgcolor: "#0D0719",
        color: "white",
        borderRadius: 2,
        boxShadow: 4,
        overflow: "hidden",
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: "#3C1D68" }}>
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
              >
                {header === "Volumen en" ? (
                  <>
                    Volumen en{" "}
                    <Select
                      value={timeframe}
                      onChange={(e) => setTimeframe(e.target.value)}
                      sx={{
                        color: "white",
                        border: "none",
                        height: "30px",
                        pl: "10px",
                        backgroundColor: "transparent",
                        fontSize: "inherit",
                        ".MuiSelect-select": { padding: 0 },
                      }}
                    >
                      <MenuItem value="1h">1h</MenuItem>
                      <MenuItem value="24h">24h</MenuItem>
                      <MenuItem value="7d">7d</MenuItem>
                    </Select>
                  </>
                ) : (
                  header
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {coins.map((coin, index) => (
            <TableRow
              key={index}
              sx={{
                bgcolor: "#0D0719",
                borderBottom: "1px solid #3C1D68",
                cursor: !show ? "pointer" : "default",
              }}
              onClick={() =>
                !show &&
                coin.name &&
                goTo(`/dashboard/coins/${coin.name.toLowerCase()}`)
              }
            >
              <TableCell
                sx={{
                  color: "white",
                  gap: 1,
                  textAlign: "center",
                }}
              >
                {!show ? (
                  <>
                    <span style={{ fontSize: "1.2rem" }}>{coin.icon}</span>
                    <span>{coin.name}</span>
                  </>
                ) : (
                  <span>{coin.date}</span>
                )}
              </TableCell>

              <TableCell sx={{ color: "white", textAlign: "center" }}>
                {coin.price}
              </TableCell>

              <TableCell
                sx={{
                  color: coin.isPositive ? "#4CAF50" : "#E53935",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {coin.isPositive ? (
                  <ArrowUpward fontSize="small" />
                ) : (
                  <ArrowDownward fontSize="small" />
                )}
                {coin.change}
              </TableCell>

              <TableCell sx={{ color: "white", textAlign: "center" }}>
                {coin.volume?.[timeframe] || "-"}
              </TableCell>

              {!show && (
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {coin.marketCap || "-"}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinsTable;
