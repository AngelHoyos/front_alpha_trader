import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { PropsTable } from "../../models/CoinHistory.model";

const HistoryTable: React.FC<PropsTable> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 700, margin: "auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Moneda</TableCell>
            <TableCell>LTP</TableCell>
            <TableCell>%</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.iconMoneda + " " + item.moneda}</TableCell>
              <TableCell>{item.ltp}</TableCell>
              <TableCell>{item.porcentaje}</TableCell>
              <TableCell>{item.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
