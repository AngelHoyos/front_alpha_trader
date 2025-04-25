import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import { CoinPreferencesProps } from "../../../../models/Profile.model";
import { useCoinPreference } from "../../../../hooks/useCoinPreference";
import axiosInstance from "../../../../api/axiosInstance/axiosInstance";

const CoinPreferences: React.FC<CoinPreferencesProps> = ({
  availableCoins = [],
  selectedCoins = [],
  onChange,
}) => {
  const { preferences, coinToAdd, setCoinToAdd, handleToggle, handleAddCoin } =
    useCoinPreference(selectedCoins);
  const handlePreferencesChange = async (updatedPreferences: string[]) => {
    try {
    //   await axiosInstance.put(
    //     "/updated/coin",
    //     JSON.stringify({ coinsList: updatedPreferences })
    //   );
      onChange(updatedPreferences);
    } catch (error) {
      console.error("Error al actualizar preferencias", error);
    }
  };
  return (
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Preferencias de Monedas
      </Typography>
      <CardContent>
        <FormGroup>
          {/* Monedas seleccionadas */}
          <Grid container spacing={2}>
            {preferences.map((coin) => (
              <Grid item xs={6} sm={4} key={coin}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={preferences.includes(coin)}
                      onChange={() => {
                        handleToggle(coin);
                        handlePreferencesChange(preferences);
                      }}
                      name={coin}
                    />
                  }
                  label={coin.charAt(0).toUpperCase() + coin.slice(1)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Select para añadir monedas */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Seleccionar Moneda</InputLabel>
                <Select
                  value={coinToAdd}
                  onChange={(e) => setCoinToAdd(e.target.value)}
                  label="Seleccionar Moneda"
                >
                  {availableCoins.map((coin) => (
                    <MenuItem key={coin} value={coin}>
                      {coin.charAt(0).toUpperCase() + coin.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{ height: "100%" }}
                onClick={()=>{
                    handleAddCoin();
                    handlePreferencesChange(preferences);
                }}
                disabled={!coinToAdd}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default CoinPreferences;
