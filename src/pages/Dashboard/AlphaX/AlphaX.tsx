import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useGeminiChat } from "../../../hooks/useGeminiChat";
import { useChatLogic } from "../../../hooks/useChatLogic";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { TipsModal } from "../../../components/Modals/ModalTipsAlphaX/ModalTipsAlphaX";

const AlphaX: React.FC = () => {
  const {
    message,
    botReply,
    loading,
    error,
    handleChange,
    handleSubmit: originalHandleSubmit,
    setError,
    setMessage,
  } = useGeminiChat();

  const {
    chatHistory,
    clearChat,
    handleSubmit,
    tipsModalOpen,
    setTipsModalOpen,
    isFirstVisit,
    setIsFirstVisit,
  } = useChatLogic({
    botReply,
    message,
    error,
    loading,
    onSubmit: originalHandleSubmit,
    resetMessage: () => setMessage(""),
    setError,
  });
  const handleSelectTip = (tip: string) => {
    setMessage(tip);
  };

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
        {isFirstVisit && chatHistory.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "75%",
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, rgba(81,20,166,0.2) 0%, rgba(81,20,166,0.1) 100%)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
                textAlign: "justified",
                textAlignLast: "left",
              }}
            >
              <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
                Bienvenido a Alpha X
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Tu asesor inteligente y confiable.
              </Typography>

              <Box
                sx={{
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  pt: 2,
                  mt: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
                  Escrito: algo
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1,
                      border: "1px solid white",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="body2">Nuevo Chat</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1,
                      border: "1px solid white",
                      borderRadius: "4px",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontSize: "12px" }}
                    >
                      ✓
                    </Typography>
                  </Box>
                  <Typography variant="body2">Historial</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      mr: 1,
                      border: "1px solid white",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="body2">Consejos</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {chatHistory.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                msg.type === "question" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            {msg.type === "question" ? (
              <Box
                sx={{
                  maxWidth: "75%",
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(81,20,166,0.45)",
                  color: "white",
                }}
              >
                <Typography variant="body1">{msg.content}</Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  maxWidth: "75%",
                  p: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, rgba(81,20,166,0.2) 0%, rgba(81,20,166,0.1) 100%)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  boxShadow: "none",
                  textAlign: "justify",
                  textAlignLast: "left",
                }}
              >
                {msg.type === "error" ? (
                  <Typography variant="body1" sx={{ color: "#ff5252" }}>
                    {msg.content}
                  </Typography>
                ) : (
                  <ReactMarkdown
                    children={msg.content}
                    components={{
                      p: ({ children }) => (
                        <Typography
                          variant="body1"
                          sx={{ mb: 1.5, lineHeight: 1.6 }}
                        >
                          {children}
                        </Typography>
                      ),
                      strong: ({ children }) => (
                        <strong style={{ color: "#b388ff" }}>{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul
                          style={{
                            paddingLeft: "20px",
                            margin: "12px 0",
                          }}
                        >
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li style={{ marginBottom: "8px" }}>{children}</li>
                      ),
                      code: ({ children }) => (
                        <Box
                          component="pre"
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.3)",
                            borderRadius: 1,
                            p: 1.5,
                            overflowX: "auto",
                            fontSize: "0.85rem",
                            mt: 1,
                          }}
                        >
                          {children}
                        </Box>
                      ),
                    }}
                  />
                )}
              </Box>
            )}
          </Box>
        ))}

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Box
              sx={{
                maxWidth: "75%",
                p: 2,
                borderRadius: 2,
                background:
                  "linear-gradient(135deg, rgba(81,20,166,0.2) 0%, rgba(81,20,166,0.1) 100%)",
                color: "white",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "none",
                textAlign: "justify",
                textAlignLast: "left",
                "& pre": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                  borderRadius: 1,
                  p: 1.5,
                  overflowX: "auto",
                },
              }}
            >
              <CircularProgress size={20} />
            </Box>
          </Box>
        )}
      </Paper>

      <Box>
        <Box sx={{ p: 2, pt: 0 }}>
          <Stack direction="row" spacing={1}>
            <TextField
              variant="outlined"
              placeholder="Escribe tu mensaje..."
              fullWidth
              value={message}
              disabled={loading}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
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
              InputProps={{
                endAdornment: (
                  <IconButton
                    edge="end"
                    onClick={handleSubmit}
                    disabled={loading || message.trim() === ""}
                    sx={{
                      color: "white",
                      p: 1,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={18} sx={{ color: "white" }} />
                    ) : (
                      <FontAwesomeIcon icon={faPaperPlane} />
                    )}
                  </IconButton>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          </Stack>
        </Box>
        <Box sx={{ p: 2, display: "flex", gap: 1, overflowX: "auto" }}>
          <Button
            variant="outlined"
            onClick={() => setTipsModalOpen(true)}
            startIcon={<FontAwesomeIcon icon={faLightbulb} />}
            sx={{
              color: "white",
              borderColor: "white",
              flexGrow: 1,
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Consejos
          </Button>

          <Button
            variant="outlined"
            onClick={clearChat}
            startIcon={<FontAwesomeIcon icon={faTrash} />}
            sx={{
              color: "white",
              borderColor: "white",
              whiteSpace: "nowrap",
              flexShrink: 0,
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Limpiar chat
          </Button>
        </Box>
      </Box>
      <TipsModal
        open={tipsModalOpen}
        onClose={() => setTipsModalOpen(false)}
        onSelectTip={handleSelectTip}
      />
    </Box>
  );
};

export default AlphaX;
