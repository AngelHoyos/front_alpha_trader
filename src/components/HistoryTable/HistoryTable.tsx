import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Popover,
  MenuItem,
  MenuList,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { PropsTable } from "../../models/CoinHistory.model";
import { useFilter } from "../../hooks/useFilter";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HistoryTable: React.FC<PropsTable> = ({ data }) => {
  const {setFilter, filteredData } = useFilter(data, "moneda");
  const moneda = ["Todo", ...new Set(data.map((item) => item.moneda))];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{
        width: "92%",
        mt: 1,
        display: "flex",
        flexDirection: "column",
        ml: "60px",
        borderRadius: "15px",
        border: "1px solid #571773",
        background: "rgba(87,23,115,0.51)",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          color: "white",
          mx: 2,
          my: 1,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Historial
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            background: "rgba(87,23,115,0.8)",
            color: "white",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            gap: 1,
            boxShadow: "none",
            "&:hover": {
              background: "rgba(87,23,115,0.51)",
              boxShadow: "none",
            },
          }}
        >
          <FontAwesomeIcon icon={faFilter} />
          Filtro
        </Button>
      </Box>

      {/* Popover de Filtro */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ mt: 1,}}
      >
        <MenuList
          sx={{
            backgroundColor: "rgb(87,23,115)",
            color: "white",
            borderRadius: "8px",
            width: 180,
          }}
        >
          {moneda.map((monedas, index) => (
            <MenuItem
              key={`${monedas}-${index}`}
              onClick={() => {
                setFilter(monedas);
                handleClose();
              }}
              sx={{
                color: "white",
                "&:hover": { backgroundColor: "rgba(110,33,166,0.8)" },
              }}
            >
              {monedas === "Todo" ? "Todas las monedas" : monedas}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>

      <TableContainer
        component={Paper}
        sx={{
          background: "rgba(87,23,115,0.51)",
          color: "white",
          borderRadius: "10px",
          overflow: "hidden",
          mt: 2,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "rgba(81,20,166,0.45)" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Moneda
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem,",
                  textAlign: "center",
                }}
              >
                LTP
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                %
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "center",
                }}
              >
                Valor
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:hover": { backgroundColor: "rgba(81,20,166,0.2)" },
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {item.iconMoneda} {item.moneda}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  ${item.ltp}
                </TableCell>
                <TableCell
                  sx={{
                    color:
                      parseFloat(item.porcentaje.replace("%", "")) >= 0
                        ? "#06C270"
                        : "#D55F5A",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.porcentaje}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {item.valor}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HistoryTable;
