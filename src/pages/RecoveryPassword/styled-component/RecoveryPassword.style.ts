import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const RootContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#000317",
  padding: "2rem",
});

export const FormContainer = styled(Box)({
  maxWidth: 600,
  flex: 1,
  backgroundColor: "rgba(87,23,115,0.51)",
  padding: "2rem",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
});
