import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
} from "@mui/icons-material";
import { AccountStatusProps } from "../../../../models/AccountStatus.model";

const AccountStatus: React.FC<AccountStatusProps> = ({
  cuenta,
  historyCoins,
}) => {
  return (
    <Box
      sx={{ p: 4, width: "80%", mx: "auto", borderRadius: 3, boxShadow: 3 }}
    >
      {/* Tarjetas de Resumen */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "rgba(87, 23, 115, 0.51)",
              color: "#E0E0E0",
              textAlign: "center",
              borderRadius: 3,
              boxShadow: 5,
              p: 2,
            }}
          >
            <CardContent>
              <AccountBalanceWallet fontSize="large" />
              <Typography variant="h6">Total</Typography>
              <Typography variant="h5">
                ${cuenta.total.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: "#C62828",
              color: "#E0E0E0",
              textAlign: "center",
              borderRadius: 3,
              boxShadow: 5,
              p: 2,
            }}
          >
            <CardContent>
              <TrendingDown fontSize="large" />
              <Typography variant="h6">Gastado</Typography>
              <Typography variant="h5">
                ${cuenta.gastado.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              backgroundColor: cuenta.restante < 0 ? "#D55F5A" : "#2E7D32",
              color: "#E0E0E0",
              textAlign: "center",
              borderRadius: 3,
              boxShadow: 5,
              p: 2,
            }}
          >
            <CardContent>
              <TrendingUp fontSize="large" />
              <Typography variant="h6">Restante</Typography>
              <Typography variant="h5">
                ${cuenta.restante.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* Historial de Gastos */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 3,
          mt: 5,
          textAlign: "left",
          color: "#E0E0E0",
        }}
      >
        Historial de Inversiones
      </Typography>
      {/* <Divider sx={{ mb: 2, backgroundColor: "#E0E0E0" }} /> */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 5,
          backgroundColor: "rgba(87,23,115,0.15)",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "rgba(87, 23, 115, 0.51)" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#E0E0E0",
                  fontWeight: "bold",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Descripción
              </TableCell>
              <TableCell
                sx={{
                  color: "#E0E0E0",
                  fontWeight: "bold",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Monto Invertido
              </TableCell>
              <TableCell
                sx={{
                  color: "#E0E0E0",
                  fontWeight: "bold",
                  textAlign: "center",
                  py: 2,
                }}
              >
                Resultado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyCoins.map((coin) => (
              <TableRow key={coin.id} hover>
                <TableCell
                  sx={{ textAlign: "center", color: "#E0E0E0", py: 2 }}
                >
                  {coin.description}
                </TableCell>
                <TableCell
                  sx={{ textAlign: "center", color: "#E0E0E0", py: 2 }}
                >
                  ${coin.amount.toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                    color: coin.result === "ganancia" ? "#2E7D32" : "#C62828",
                    fontWeight: "bold",
                    py: 2,
                  }}
                >
                  {coin.result === "ganancia" ? "✅ Ganancia" : "❌ Pérdida"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AccountStatus;
