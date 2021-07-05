import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";
import { ATRIndicator, ATRIndicatorOutput, ATRIndicatorInput, ATRIndicatorParameters, ATRMethod } from "./indicators/atr.port";
import { EMAIndicator, EMAIndicatorOutput, EMAIndicatorInput, EMAIndicatorParameters, EMAMethod } from "./indicators/ema.port";
import { MACDIndicator, MACDIndicatorOutput, MACDIndicatorInput, MACDIndicatorParameters, MACDMethod } from "./indicators/macd.port";
import { RSIIndicator, RSIIndicatorOutput, RSIIndicatorInput, RSIIndicatorParameters, RSIMethod } from "./indicators/rsi.port";
import { SMAIndicator, SMAIndicatorOutput, SMAIndicatorInput, SMAIndicatorParameters, SMAMethod } from "./indicators/sma.port";
import { IndicatorTrigger } from "../../entities/triggers/indicator-trigger";
import { PriceIndicator, PriceIndicatorInput, PriceIndicatorOutput, PriceIndicatorParameters, PriceMethod } from "./indicators/price.port";
import { Candle } from "../../entities";

export const IndicatorNames = ["sma", "ema", "rsi", "macd", "bearish", "bullish", "atr", "price"] as const;
export type IndicatorsName = typeof IndicatorNames[number];
export type IndicatorProps = SMAIndicator | EMAIndicator | RSIIndicator | MACDIndicator | ATRIndicator | PriceIndicator;
export type IndicatorParameters = SMAIndicatorParameters | EMAIndicatorParameters | RSIIndicatorParameters | MACDIndicatorParameters | ATRIndicatorParameters | PriceIndicatorParameters;
export type IndicatorInput = SMAIndicatorInput | EMAIndicatorInput | RSIIndicatorInput | MACDIndicatorInput | ATRIndicatorInput | PriceIndicatorInput;
export type IndicatorOutput = SMAIndicatorOutput | EMAIndicatorOutput | RSIIndicatorOutput | MACDIndicatorOutput | ATRIndicatorOutput | PriceIndicatorOutput;
export type IndicatorMethod = PriceMethod | RSIMethod | MACDMethod | EMAMethod | ATRMethod | SMAMethod;
export interface Values { values: number[]; }
