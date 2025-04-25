import { styled, TextField } from "@mui/material";

export const CustomTextField=styled(TextField)({
    "& label": {
        color: "white", // Color del texto del label cuando no está enfocado
      },
    "& label.Mui-focused": {
        color: "white", // Cambia el color del label cuando está enfocado
      },
    "& .MuiOutlinedInput-root": {
        borderRadius:'10px',
        "& fieldset": {
          borderColor: "#AFAFAF", // Color del borde por defecto
        },
        "&:hover fieldset": {
          borderColor: "#5114A6", // Color del borde al pasar el mouse
        },
        "&.Mui-focused fieldset": {
          borderColor: "#5114A6", // Color del borde cuando está enfocado
        },
        "& input": {
            color: "white", // Color del texto dentro del input
          },
      },
});