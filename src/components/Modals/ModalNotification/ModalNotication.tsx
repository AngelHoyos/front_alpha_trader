import React from "react";
import { NotificationCustomProps } from "../../../models/Notification.model";
import { Box, Modal, Typography, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ModalNotification: React.FC<NotificationCustomProps> = ({
  open,
  onClose,
  notifications,
  onRemoveNotification,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        pr: 5,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: "0%",
          width: "25%",
          height: "100vh",
          backgroundColor: "#000317",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" color="white" sx={{ fontWeight: "700" }}>
            Notificaciones
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          <Stack spacing={2}>
            {notifications.map((notification, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: "#1A1A2E",
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  position: "relative",
                }}
              >
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    color: "white",
                  }}
                  onClick={() => onRemoveNotification(index)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <Typography variant="h6" color="white">
                  {notification.title}
                </Typography>
                <Typography variant="body2" color="gray">
                  {notification.message}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalNotification;
