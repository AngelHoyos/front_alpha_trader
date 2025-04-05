import { Select, styled } from "@mui/material";

export const CustomSelect = styled(Select)`
  color: white;
  & .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }
  & .MuiSelect-icon {
    color: white; 
  }
`;
