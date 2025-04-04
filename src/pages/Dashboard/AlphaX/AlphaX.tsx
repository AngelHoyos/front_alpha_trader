import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

interface Message {
  sender: "user" | "ai";
  text: string;
}

const AlphaX: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai", text: "Hola 👋 ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const newMessages = [...messages, { sender: "user", text: trimmed }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Esta es una respuesta generada por IA ✨",
        },
      ]);
    }, 1000);
  };

  const handleEdit = (index: number, currentText: string) => {
    setEditIndex(index);
    setEditText(currentText);
  };

  const handleSaveEdit = () => {
    if (editIndex === null) return;

    const updatedMessages = [...messages];
    updatedMessages[editIndex] = {
      ...updatedMessages[editIndex],
      text: editText,
    };

    setMessages(updatedMessages);
    setEditIndex(null);
    setEditText("");
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
                p: 1.5,
                borderRadius: 2,
                maxWidth: "75%",
                bgcolor: msg.sender === "user" ? "#3f51b5" : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#000",
                position: "relative",
              }}
            >
              {editIndex === i ? (
                <Stack direction="row" spacing={1}>
                  <TextField
                    size="small"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    fullWidth
                    variant="outlined"
                    sx={{
                      input: {
                        color: msg.sender === "user" ? "#fff" : "#000",
                      },
                    }}
                  />
                  <IconButton onClick={handleSaveEdit} color="success">
                    <SaveIcon fontSize="small" />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2">{msg.text}</Typography>
                  {msg.sender === "user" && (
                    <IconButton
                      onClick={() => handleEdit(i, msg.text)}
                      size="small"
                      sx={{ color: "#fff" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  )}
                </Stack>
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

          <IconButton color="primary" onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default AlphaX;
