// src/types/cryptoTypes.ts

/**
 * Detalles específicos de una criptomoneda.
 */
export interface CoinDetail {
    id: string;
    name: string;
    symbol: string;
    binanceSymbol: string; // Símbolo específico de Binance
    image: string;         // URL de la imagen
    marketCap: number;
    marketCapRank: number;
    currentPrice: number;
    high24h: number;
    low24h: number;
    priceChangePercentage24h: number;
    totalVolume: number;
    trend24h: 'bullish' | 'bearish' | 'neutral' | string; // Puedes ser más específico si conoces todos los valores
    lastUpdated: string; // Fecha en formato ISO string
  }
  
  /**
   * Datos de una vela (Kline) individual.
   * Nota: Muchos campos pueden ser null según tu ejemplo.
   */
  export interface KlineEntry {
    id: string | null;
    name: string | null;
    symbol: string;
    binanceSymbol: string;
    image: string | null;
    marketCap: number | null;
    marketCapRank: number | null;
    currentPrice: number; // Precio de cierre de la vela? Revisa la semántica
    highPrice: number;    // Precio más alto de la vela
    lowPrice: number;     // Precio más bajo de la vela
    openPrice: number;    // Precio de apertura de la vela
    priceChangePercentage: number | null;
    totalVolume: number;
    trend: string | null; // Similar a trend24h, podría ser tipado más estrictamente
    openTime: string;     // Fecha en formato ISO string
    closeTime: string;    // Fecha en formato ISO string
    lastUpdated: string;  // Fecha en formato ISO string
  }
  
  /**
   * Estructura completa de la respuesta del evento 'preferenceKlineData'.
   */
  export interface CoinDetailsResponse {
    coinDetail: CoinDetail;
    klines: KlineEntry[]; // Array de velas
    preferredSymbols: string[]; // Lista de símbolos preferidos (parece redundante aquí)
    binanceSymbol: string;
    interval: string;
    limit: number;
  }
  
  // --- Tipos para otros eventos (ajustar si es necesario) ---
  
  /**
   * Tipo para los datos recibidos en el evento 'preferencesData'.
   * Asumiendo que solo envía los símbolos preferidos.
   */
  export interface PreferencesData {
    preferredSymbols: string[];
  }
  
  /**
   * Tipo para un objeto individual en el array de 'preferenceUpdate'.
   */
  export interface UpdatedCoinInfo {
    symbol: string; // Asegúrate que sea el 'id' (ej: 'bitcoin') o el 'symbol' (ej: 'btc') según necesites
    // Agrega otras propiedades si existen (ej. price, changePercent, etc.)
    // name?: string;
    // currentPrice?: number;
  }
  
  /**
   * Tipo para los datos recibidos en el evento 'preferenceUpdate'.
   */
  export type PreferenceUpdateData = UpdatedCoinInfo[];