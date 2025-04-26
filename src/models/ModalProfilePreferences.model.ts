export interface Question {
  question: string;
  answer: string;
  type:
    | "coins"
    | "tolerancia_riesgo"
    | "horizonte_inversion"
    | "motivo_inversion"
    | "experiencia_crypto"
    | "interes_especifico";
}

export interface ProgressiveQuestionsModalProps {
  open: boolean;
  onClose: () => void;
}
