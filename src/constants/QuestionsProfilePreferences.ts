import { Question } from "../models/ModalProfilePreferences.model";
export const questions: Question[] = [
  {
    question: "¿Cuáles son tus monedas preferidas?",
    answer: "",
    type: "coins",
  },
  {
    question: "¿Cuál es tu tolerancia al riesgo?",
    answer: "",
    type: "tolerancia_riesgo",
  },
  {
    question: "¿Cuál es tu horizonte de inversión?",
    answer: "",
    type: "horizonte_inversion",
  },
  {
    question: "¿Por qué deseas invertir en criptomonedas?",
    answer: "",
    type: "motivo_inversion",
  },
  {
    question: "¿Qué experiencia tienes con criptomonedas?",
    answer: "",
    type: "experiencia_crypto",
  },
  {
    question: "¿Tienes intereses específicos?",
    answer: "",
    type: "interes_especifico",
  },
];
