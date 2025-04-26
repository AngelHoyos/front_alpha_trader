import {
    ApiResponse,
    ApiResponseTwo,
    CoinProfile,
    ResponseProfilePreferences,
  } from "./../models/Profile.model";
  import { useState, useEffect } from "react";
  import { Question } from "../models/ModalProfilePreferences.model";
  import axiosInstance from "../api/axiosInstance/axiosInstance";
  
  export const useQuestionnaire = (
    initialQuestions: Question[],
    onSuccess?: () => void
  ) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Question[]>(initialQuestions);
    const [availableCoins, setAvailableCoins] = useState<CoinProfile[]>([]);
    const [loadingCoins, setLoadingCoins] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
  
    const fetchCoins = async () => {
      try {
        setLoadingCoins(true);
        setError(null);
        const response = await axiosInstance.get<ApiResponse>(
          "/preferencesProfile/GetCoinsList"
        );
        if (response.data.status && response.data.data) {
          setAvailableCoins(
            response.data.data.filter((coin) => coin.name && coin.symbol)
          );
        } else {
          throw new Error(
            response.data.message || "Error al obtener las monedas"
          );
        }
      } catch (err) {
        console.error("Error fetching coins:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Error desconocido al cargar monedas"
        );
      } finally {
        setLoadingCoins(false);
      }
    };
  
    useEffect(() => {
      if (
        answers[currentQuestionIndex]?.type === "coins" &&
        availableCoins.length === 0
      ) {
        fetchCoins();
      }
    }, [currentQuestionIndex]);
  
    const handleNext = () => {
      if (currentQuestionIndex < initialQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    };
  
    const handlePrevious = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };
  
    const handleAnswerChange = (value: string | string[]) => {
      const newAnswers = [...answers];
      const currentQuestion = newAnswers[currentQuestionIndex];
  
      if (Array.isArray(value)) {
        currentQuestion.answer = value.join(", ");
      } else {
        currentQuestion.answer = value;
      }
  
      setAnswers(newAnswers);
    };
  
    const isLastQuestion = currentQuestionIndex === initialQuestions.length - 1;
    const currentQuestion = answers[currentQuestionIndex];
  
    const handleSubmit = async () => {
      setIsSubmitting(true);
      setSubmitError(null);
  
      const coinsAnswer = answers.find((q) => q.type === "coins")?.answer || "";
      const riskTolerance = answers.find((q) => q.type === "tolerancia_riesgo")?.answer || "";
      const investmentHorizon = answers.find((q) => q.type === "horizonte_inversion")?.answer || "";
      const financialMotivations = answers.find((q) => q.type === "motivo_inversion")?.answer || "";
      const experience = answers.find((q) => q.type === "experiencia_crypto")?.answer || "";
      const interestsAnswer = answers.find((q) => q.type === "interes_especifico")?.answer || "";
  
      // Validación básica de campos obligatorios
      const errors: string[] = [];
      if (!coinsAnswer) errors.push("Debes seleccionar al menos una moneda.");
      if (!riskTolerance) errors.push("Selecciona tu tolerancia al riesgo.");
      if (!investmentHorizon) errors.push("Selecciona tu horizonte de inversión.");
      if (!financialMotivations) errors.push("Indica tu motivo para invertir.");
      if (!experience) errors.push("Indica tu experiencia en criptomonedas.");
  
      if (errors.length > 0) {
        setSubmitError(errors.join("\n"));
        setIsSubmitting(false);
        return;
      }
  
      try {
        const transformedData: ResponseProfilePreferences = {
          coins: coinsAnswer.split(", ").filter(Boolean),
          RiskTolerance: riskTolerance as ResponseProfilePreferences["RiskTolerance"],
          InvestmentHorizon: investmentHorizon as ResponseProfilePreferences["InvestmentHorizon"],
          FinancialMotivations: financialMotivations,
          ExperienceInCryptomonedas: experience as ResponseProfilePreferences["ExperienceInCryptomonedas"],
          SpecificInterest: interestsAnswer.split(", ").filter(Boolean),
        };
  
        const response = await axiosInstance.post<ApiResponseTwo<null>>(
          "/preferencesProfile/Create",
          transformedData
        );
  
        if (!response.data.status) {
          throw new Error(
            response.data.message || "Error al guardar preferencias"
          );
        }
  
        onSuccess?.();
        setAnswers(initialQuestions); 
        setCurrentQuestionIndex(0); 

      } catch (err) {
        console.error("Error al enviar respuestas:", err);
        setSubmitError(
          err instanceof Error ? err.message : "Error desconocido al guardar"
        );
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return {
      currentQuestionIndex,
      currentQuestion,
      answers,
      availableCoins,
      loadingCoins,
      error,
      isLastQuestion,
      isSubmitting,
      submitError,
      handleNext,
      handlePrevious,
      handleAnswerChange,
      handleSubmit,
      totalQuestions: initialQuestions.length,
    };
  };
  