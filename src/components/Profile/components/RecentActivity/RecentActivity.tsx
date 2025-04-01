import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { RecentCoinsActivityProps, Transaction } from "../../../../models/RecentActivity.model";

const RecentActivity: React.FC<RecentCoinsActivityProps> = ({ transactions }) => {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleOpen = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Box sx={{ width: "80%", mx: "auto", p: 3 }}>
      <Card sx={{ borderRadius: 3, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", bgcolor: "transparent" }}>
        <CardContent>
          {transactions.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
              No hay movimientos recientes.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: "hidden", bgcolor: "rgba(87,23,115,0.2)" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(87,23,115,0.7)" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "white", textAlign:'center' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white",  textAlign:'center' }}>Monto</TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "white", textAlign:'center' }}>Fecha</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow
                    key={tx.id}
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "rgba(87,23,115,0.15)",  
                      transition: "background-color 0.2s ease",
                      "&:hover": { backgroundColor: "rgba(87,23,115,0.25)" },  
                    }}
                    onClick={() => handleOpen(tx)}
                  >
                    <TableCell sx={{ color: "#e0e0e0",  textAlign:'center' }}>{tx.description}</TableCell>
                    <TableCell sx={{ color: tx.amount >= 0 ? "#4CAF50" : "#F44336", fontWeight: "bold", textAlign:'center' }}>
                      {tx.amount >= 0 ? `+${tx.amount}` : `${tx.amount}`} Coins
                    </TableCell>
                    <TableCell sx={{ color: "#B0B0B0",  textAlign:'center'}}>
                      {new Date(tx.date).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Modal con detalles */}
      <Dialog open={open} onClose={handleClose} sx={{ "& .MuiPaper-root": { borderRadius: 4, bgcolor: "#FFFFFF" } }}>
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center", bgcolor: "#F7F7F7" }}>
          Detalles de la Transacción
        </DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Descripción:</strong> {selectedTransaction.description}
              </Typography>
              <Typography variant="body1" sx={{ color: selectedTransaction.amount >= 0 ? "#4CAF50" : "#F44336", fontWeight: "bold", mb: 1 }}>
                <strong>Monto:</strong> {selectedTransaction.amount} Coins
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Fecha:</strong>{" "}
                {new Date(selectedTransaction.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Tipo de Transacción:</strong> {selectedTransaction.category}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", bgcolor: "#F7F7F7" }}>
          <Button
            onClick={handleClose}
            sx={{
              color: "#333333",
              backgroundColor: "#4CAF50",
              "&:hover": { backgroundColor: "#388E3C" },
              borderRadius: 3,
              px: 3,
              py: 1,
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecentActivity;
