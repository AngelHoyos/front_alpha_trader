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
  faComments,
  faLightbulb,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { TipsModal } from "../../../components/Modals/ModalTipsAlphaX/ModalTipsAlphaX";
import DotSpinner from "./components/DotSpinner/DotSpinner";

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
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              width: "100%",
              height: "100%",
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                width: "100%",
                color: "white",
                backdropFilter: "blur(10px)",
                boxShadow: "none",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ mb: 1, fontWeight: "bold", opacity: 0.6 }}
              >
                Bienvenido a Alpha X
              </Typography>
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: "bold", opacity: 0.6 }}
              >
                Tu asesor inteligente y confiable.
              </Typography>
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
              mx: "14.6%",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mx: 2,
              ml: "14.6%",
            }}
          >
            <DotSpinner />
          </Box>
        )}
      </Paper>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            p: 2,
            width: "70%",
            border: "1px #571773 solid",
            borderRadius: "30px",
            mb: 2,
          }}
        >
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
                backgroundColor: "rgba(87, 23, 115, 0.68)", // tu color base
                borderRadius: "10px",
                input: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.2)", // más suave
                  },
                  "&:hover fieldset": {
                    borderColor: "#a45de6", // púrpura claro
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#a45de6", // más llamativo al enfocar
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
                        backgroundColor: "rgba(255, 255, 255, 0.15)", // sutil y elegante
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={18} sx={{ color: "#e0e0e0" }} />
                    ) : (
                      <FontAwesomeIcon icon={faPaperPlane} />
                    )}
                  </IconButton>
                ),
              }}
              InputLabelProps={{ style: { color: "white" } }}
            />
          </Stack>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              gap: 1,
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Button
              variant="outlined"
              onClick={clearChat}
              startIcon={<FontAwesomeIcon icon={faComments} />}
              sx={{
                color: "white",
                border: "none",
                backgroundColor: "rgba(87, 23, 115, 0.68)",
                whiteSpace: "nowrap",
                borderRadius: "10px",
                width: "calc(100% * 0.14)", // equivale a 12% del contenedor
                flexShrink: 0,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(87, 23, 115, 0.90)",
                },
              }}
            >
              Nuevo chat
            </Button>
            <Button
              variant="outlined"
              onClick={() => setTipsModalOpen(true)}
              startIcon={<FontAwesomeIcon icon={faLightbulb} />}
              sx={{
                color: "white",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "rgba(87, 23, 115, 0.68)",
                width: "12%",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "rgba(87, 23, 115, 0.90)",
                },
              }}
            >
              Consejos
            </Button>
          </Box>
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
