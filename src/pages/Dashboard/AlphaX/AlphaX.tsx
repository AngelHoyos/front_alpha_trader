import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Divider,
  Stack,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  TextareaAutosize,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useAlphaX from "../../../hooks/useAlphaX";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
const AlphaX: React.FC = () => {
  const {
    messages,
    input,
    editIndex,
    editText,
    loading,
    error,
    setInput,
    handleSend,
    handleEdit,
    handleSaveEdit,
    handleCancelEdit,
    setEditText,
    setError,
  } = useAlphaX();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
      }}
    >
      {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ mx: 2, mt: 2 }}
        >
          {error}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          bgcolor: "transparent",
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                position: "relative",
              }}
            >
              {editIndex === i ? (
                <Card
                  variant="outlined"
                  sx={{
                    bgcolor: msg.sender === "user" ? "#3f51b5" : "#e0e0e0",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    borderRadius: 2,
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <TextareaAutosize
                      minRows={3}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        width: "100%",
                        backgroundColor: "transparent",
                        border: "1px solid #ccc",
                        borderRadius: 6,
                        padding: 8,
                        color: msg.sender === "user" ? "#fff" : "#000",
                        resize: "none",
                        fontFamily: "inherit",
                        fontSize: "0.9rem",
                      }}
                    />
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end", pr: 2 }}>
                    <Button
                      onClick={handleCancelEdit}
                      startIcon={<FontAwesomeIcon icon={faXmark} />}
                      color="error"
                      size="small"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveEdit}
                      startIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
                      color="success"
                      size="small"
                    >
                      Guardar
                    </Button>
                  </CardActions>
                </Card>
              ) : (
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.sender === "user" ? "#3f51b5" : "#e0e0e0",
                    color: msg.sender === "user" ? "#fff" : "#000",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2">{msg.text}</Typography>
                    {msg.sender === "user" && (
                      <IconButton
                        onClick={() => handleEdit(i, msg.text)}
                        size="small"
                        sx={{
                          color: "#90caf9",
                          "&:hover": {
                            color: "#1976d2",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} size="sm" />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Paper>

      <Divider sx={{ borderColor: "#ccc" }} />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            variant="outlined"
            placeholder="Escribe tu mensaje..."
            fullWidth
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
            InputLabelProps={{ style: { color: "white" } }}
          />

          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={loading || input.trim() === ""}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SendIcon />
            )}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default AlphaX;
