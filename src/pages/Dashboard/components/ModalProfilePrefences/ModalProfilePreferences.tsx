import {
  Modal,
  Box,
  Button,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  Autocomplete,
  Chip,
  LinearProgress,
  Paper,
  CircularProgress,
} from "@mui/material";
import { ProgressiveQuestionsModalProps } from "../../../../models/ModalProfilePreferences.model";
import { questions } from "../../../../constants/QuestionsProfilePreferences";
import { useQuestionnaire } from "../../../../hooks/useQuestionnaire";
import { useState } from "react";

const ModalProfilePreferences: React.FC<ProgressiveQuestionsModalProps> = ({
  open,
  onClose,
}) => {
  const {
    currentQuestionIndex,
    currentQuestion,
    availableCoins,
    loadingCoins,
    error,
    isLastQuestion,
    isSubmitting,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleAnswerChange,
    totalQuestions,
  } = useQuestionnaire(questions, onClose);
  const [showIntro, setShowIntro] = useState(true);

  const renderInputByType = () => {
    const inputStyles = {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#2D2F3A",
        },
        "&:hover fieldset": {
          borderColor: "#6C5DD3",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#6C5DD3",
        },
        color: "white",
        backgroundColor: "#2D2F3A",
        borderRadius: "8px",
      },
      "& .MuiInputLabel-root": {
        color: "#B2B3BD",
      },
      "& .MuiSvgIcon-root": {
        color: "#B2B3BD",
      },
      marginBottom: "1rem",
    };

    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "coins":
        if (loadingCoins) {
          return <Typography>Cargando lista de monedas...</Typography>;
        }

        if (error) {
          return <Typography color="error">{error}</Typography>;
        }

        return (
          <Autocomplete
            multiple
            options={availableCoins}
            value={
              currentQuestion.answer
                ? availableCoins.filter((coin) =>
                    currentQuestion.answer.split(", ").includes(coin.name)
                  )
                : []
            }
            onChange={(_, newValue) => {
              handleAnswerChange(newValue.map((coin) => coin.name).join(", "));
            }}
            getOptionLabel={(coin) =>
              `${
                coin.name.charAt(0).toUpperCase() + coin.name.slice(1)
              } (${coin.symbol.toUpperCase()})`
            }
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Busca y selecciona tus monedas"
                sx={{
                  ...inputStyles,
                  "& .MuiInputBase-root": {
                    padding: "6px 10px",
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((coin, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={coin.name}
                  label={`${
                    coin.name.charAt(0).toUpperCase() + coin.name.slice(1)
                  } (${coin.symbol.toUpperCase()})`}
                  sx={{
                    backgroundColor: "#6C5DD3",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        color: "white",
                      },
                    },
                  }}
                />
              ))
            }
            renderOption={(props, coin, { selected }) => (
              <li
                {...props}
                style={{
                  backgroundColor: selected
                    ? "rgba(108, 93, 211, 0.2)"
                    : "#2A2A36",
                }}
              >
                <Checkbox
                  checked={selected}
                  sx={{
                    color: "#B2B3BD",
                    "&.Mui-checked": {
                      color: "#6C5DD3",
                    },
                  }}
                />
                {`${
                  coin.name.charAt(0).toUpperCase() + coin.name.slice(1)
                } (${coin.symbol.toUpperCase()})`}
              </li>
            )}
            PaperComponent={({ children }) => (
              <Paper
                sx={{
                  backgroundColor: "#2A2A36",
                  color: "white",
                  marginTop: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                {children}
              </Paper>
            )}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: "#B2B3BD",
              },
              "& .MuiAutocomplete-clearIndicator": {
                color: "#B2B3BD",
              },
              mb: 2,
            }}
          />
        );

      case "tolerancia_riesgo":
        return (
          <FormControl fullWidth sx={inputStyles}>
            <InputLabel>Tolerancia al riesgo</InputLabel>
            <Select
              value={currentQuestion.answer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              label="Tolerancia al riesgo"
            >
              <MenuItem value="Bajo">Baja</MenuItem>
              <MenuItem value="Medio">Media</MenuItem>
              <MenuItem value="Alto">Alta</MenuItem>
            </Select>
          </FormControl>
        );

      case "horizonte_inversion":
        return (
          <FormControl fullWidth sx={inputStyles}>
            <InputLabel>Horizonte de inversión</InputLabel>
            <Select
              value={currentQuestion.answer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              label="Horizonte de inversión"
            >
              <MenuItem value="Corto">Corto plazo (menos de 1 año)</MenuItem>
              <MenuItem value="Medio">Medio plazo (1-3 años)</MenuItem>
              <MenuItem value="Largo">Largo plazo (más de 3 años)</MenuItem>
            </Select>
          </FormControl>
        );

      case "motivo_inversion":
        return (
          <FormControl fullWidth sx={inputStyles}>
            <InputLabel>Motivo de Inversión</InputLabel>
            <Select
              value={currentQuestion.answer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              label="Motivo de Inversión"
              displayEmpty
              inputProps={{
                style: {
                  padding: "16.5px 14px", // Mantiene el mismo padding que el TextField
                },
              }}
            >
              <MenuItem value="Ahorro">Ahorro</MenuItem>
              <MenuItem value="Especulación">Especulación</MenuItem>
              <MenuItem value="Ingresos pasivos">Ingresos pasivos</MenuItem>
              <MenuItem value="Jubilación">Jubilación</MenuItem>
              <MenuItem value="Educación">Educación</MenuItem>
            </Select>
          </FormControl>
        );
      case "experiencia_crypto":
        return (
          <FormControl fullWidth sx={inputStyles}>
            <InputLabel>Experiencia en criptomonedas</InputLabel>
            <Select
              value={currentQuestion.answer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              label="Experiencia en criptomonedas"
              displayEmpty
              inputProps={{
                style: {
                  padding: "16.5px 14px",
                },
              }}
            >
              <MenuItem value="Ninguna">Ninguna experiencia</MenuItem>
              <MenuItem value="Baja">Baja (1-2 años)</MenuItem>
              <MenuItem value="Media">Media (3-5 años)</MenuItem>
              <MenuItem value="Alta">Alta (+5 años)</MenuItem>
            </Select>
          </FormControl>
        );
      case "interes_especifico":
        const interestOptions = [
          "DeFi (Finanzas Descentralizadas)",
          "NFTs (Tokens No Fungibles)",
          "Staking",
          "Yield Farming",
          "Trading",
          "Inversión a Largo Plazo",
          "Minería",
          "Web3",
          "Metaverso",
          "Trading Algorítmico",
          "Contratos Inteligentes",
          "Soluciones de Capa 2",
          "DAOs (Organizaciones Autónomas Descentralizadas)",
          "Seguridad Blockchain",
          "Auditoría de Contratos Inteligentes",
          "Gaming Crypto / Play-to-Earn",
          "Regulación y Cumplimiento",
        ];

        return (
          <Autocomplete
            multiple
            options={interestOptions}
            value={
              currentQuestion.answer ? currentQuestion.answer.split(", ") : []
            }
            onChange={(_, newValue) => {
              handleAnswerChange(newValue.join(", "));
            }}
            filterSelectedOptions
            noOptionsText="No hay coincidencias"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Área de interés específico"
                sx={{
                  ...inputStyles,
                  "& .MuiInputBase-root": {
                    padding: "6px 10px",
                  },
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  sx={{
                    backgroundColor: "#6C5DD3",
                    color: "white",
                    "& .MuiChip-deleteIcon": {
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": {
                        color: "white",
                      },
                    },
                  }}
                />
              ))
            }
            renderOption={(props, option, { selected }) => (
              <li
                {...props}
                style={{
                  backgroundColor: selected
                    ? "rgba(108, 93, 211, 0.2)"
                    : "#2A2A36",
                }}
              >
                <Checkbox
                  checked={selected}
                  sx={{
                    color: "#B2B3BD",
                    "&.Mui-checked": {
                      color: "#6C5DD3",
                    },
                  }}
                />
                {option}
              </li>
            )}
            PaperComponent={({ children }) => (
              <Paper
                sx={{
                  backgroundColor: "#2A2A36",
                  color: "white",
                  marginTop: "8px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                {children}
              </Paper>
            )}
            sx={{
              "& .MuiAutocomplete-popupIndicator": {
                color: "#B2B3BD",
              },
              "& .MuiAutocomplete-clearIndicator": {
                color: "#B2B3BD",
              },
              mb: 2,
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            value={currentQuestion.answer || ""}
            onChange={(e) => handleAnswerChange(e.target.value)}
            variant="outlined"
            sx={{ marginBottom: "1rem" }}
          />
        );
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {}}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEscapeKeyDown
      BackdropProps={{
        onClick: (e) => e.stopPropagation(),
      }}
    >
      <Box
        sx={{
          backgroundColor: "#000317",
          padding: "2rem",
          borderRadius: "12px",
          width: "500px",
          maxWidth: "90vw",
          margin: "auto",
          top: "50%",
          color: "white",
          left: "50%",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          boxShadow: "0px 4px 20px rgba(0, 3, 23, 0.5)",
          border: "1px solid #2D2F3A",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {showIntro ? (
          <>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  mb: 2,
                }}
              >
                ¡Bienvenido a Alpha Trader!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#B2B3BD",
                  lineHeight: 1.6,
                }}
              >
                Queremos conocerte mejor para brindarte recomendaciones
                personalizadas basadas en tu perfil de riesgo, experiencia y
                objetivos de inversión.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setShowIntro(false)}
                sx={{
                  backgroundColor: "rgba(81,20,166,0.70)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgba(81,20,166,0.45)",
                  },
                }}
              >
                Empezar
              </Button>
            </Box>
          </>
        ) : (
          <>
            {/* Barra de progreso */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: "#B2B3BD", fontWeight: 500 }}
                >
                  Pregunta {currentQuestionIndex + 1} de {totalQuestions}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#5114A6", fontWeight: 600 }}
                >
                  {Math.round(
                    ((currentQuestionIndex + 1) / totalQuestions) * 100
                  )}
                  %
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={((currentQuestionIndex + 1) / totalQuestions) * 100}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "#2D2F3A",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#5114A6",
                  },
                }}
              />
            </Box>

            {/* Pregunta actual */}
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                fontSize: "1.2rem",
                color: "#FFFFFF",
                lineHeight: 1.5,
              }}
            >
              {currentQuestion?.question}
            </Typography>

            {/* Input dinámico */}
            {renderInputByType()}

            {/* Botones de navegación */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 5,
              }}
            >
              <Button
                onClick={handlePrevious}
                variant="outlined"
                disabled={currentQuestionIndex === 0}
                sx={{
                  color: "#FFFFFF",
                  borderColor: "#3A2D52",
                  fontWeight: 500,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "#5114A6",
                    backgroundColor: "rgba(81, 20, 166, 0.1)",
                  },
                  "&:disabled": {
                    borderColor: "#2D2F3A",
                    color: "#6D6D6D",
                  },
                }}
              >
                Anterior
              </Button>
              <Button
                onClick={isLastQuestion ? handleSubmit : handleNext}
                variant="contained"
                disabled={isSubmitting || !currentQuestion?.answer} // Deshabilitar si está enviando o si no hay respuesta
                sx={{
                  backgroundColor: "#5114A6",
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  color: "#FFFFFF",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#3F0E8C",
                  },
                  "&:disabled": {
                    backgroundColor: "#2D2F3A",
                    color: "#6D6D6D",
                  },
                }}
              >
                {isLastQuestion ? (
                  isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "#FFFFFF" }} />
                  ) : (
                    "Finalizar"
                  )
                ) : (
                  "Siguiente"
                )}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ModalProfilePreferences;
