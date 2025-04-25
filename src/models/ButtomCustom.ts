import { SxProps } from "@mui/material";
import { IconDefinition } from "./../../node_modules/@fortawesome/fontawesome-common-types/index.d";
import { Theme } from "@emotion/react";
export interface ButtonCustomProps {
  className?: string;
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: IconDefinition;
}

export interface ButtonCustomLoading {
  onClick?: () => void;
  children: React.ReactNode;
}

export interface Props extends ButtonCustomLoading {
  sx?: SxProps<Theme>;
  type?:'button' | 'submit'
}
