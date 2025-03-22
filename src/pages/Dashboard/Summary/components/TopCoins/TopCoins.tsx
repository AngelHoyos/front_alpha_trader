import { Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import { TopCoinstProps } from "../../../../../models/TopCoins";

const TopCoins: React.FC = () => {
    const dummyCoins: TopCoinstProps[] = [
        { id: "btc", icon: "🟡", moneda: "Bitcoin", estado: "Alcista", valor: 50000 },
        { id: "eth", icon: "🔵", moneda: "Ethereum", estado: "Bajista", valor: 3500 },
        { id: "bnb", icon: "🟢", moneda: "Binance Coin", estado: "Estable", valor: 420 },
        { id: "ada", icon: "🔴", moneda: "Cardano", estado: "Bajista", valor: 1.2 },
        { id: "xrp", icon: "🟣", moneda: "XRP", estado: "Alcista", valor: 0.85 },
      ];
      
  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" align="center" gutterBottom>
          Top 5 Cryptocurrencies
        </Typography>
        <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    {
                        dummyCoins.map((coin)=>(
                            <TableRow key={coin.id}>
                                <TableCell>{coin.icon}</TableCell>
                                <TableCell>{coin.moneda}</TableCell>
                                <TableCell>{coin.estado}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopCoins;
