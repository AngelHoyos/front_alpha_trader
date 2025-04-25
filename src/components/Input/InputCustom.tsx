import React, { useState } from "react";
import { InputCustomProps } from "../../models/InputCustom.model";
import { CustomTextField } from "./styled-component/InputCustom.style";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputCustom: React.FC<InputCustomProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  fullWidth = false,
  InputLabelProps,
  error,
  helperText,
  inputRef,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      inputRef={inputRef}
      label={label}
      name={name}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      error={error}
      helperText={helperText}
      variant="outlined"
      InputLabelProps={InputLabelProps ? { shrink: true } : undefined}
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "white" }} />
                    ) : (
                      <Visibility sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default InputCustom;
