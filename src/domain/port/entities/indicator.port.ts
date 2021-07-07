import { ATRIndicator, ATRIndicatorOutput, ATRIndicatorInput, ATRIndicatorParameters, ATRMethod } from "./indicators/atr.port";
import { EMAIndicator, EMAIndicatorOutput, EMAIndicatorInput, EMAIndicatorParameters, EMAMethod } from "./indicators/ema.port";
import { MACDIndicator, MACDIndicatorOutput, MACDIndicatorInput, MACDIndicatorParameters, MACDMethod } from "./indicators/macd.port";
import { RSIIndicator, RSIIndicatorOutput, RSIIndicatorInput, RSIIndicatorParameters, RSIMethod } from "./indicators/rsi.port";
import { SMAIndicator, SMAIndicatorOutput, SMAIndicatorInput, SMAIndicatorParameters, SMAMethod } from "./indicators/sma.port";
import { PriceIndicator, PriceIndicatorInput, PriceIndicatorOutput, PriceIndicatorParameters, PriceMethod } from "./indicators/price.port";
import { Candle } from "../../entities";
import { AverageGainIndicator, AverageGainIndicatorInput, AverageGainIndicatorOutput, AverageGainIndicatorParameters } from "./indicators/average-gain.port";
import { AverageLossIndicator, AverageLossIndicatorInput, AverageLossIndicatorOutput, AverageLossIndicatorParameters } from "./indicators/average-loss.port";

export const IndicatorNames = ["sma", "ema", "rsi", "macd", "bearish", "bullish", "atr", "price"] as const;
export type IndicatorsName = typeof IndicatorNames[number];
export type IndicatorProps = SMAIndicator | EMAIndicator | RSIIndicator | MACDIndicator | ATRIndicator | PriceIndicator | AverageGainIndicator | AverageLossIndicator;
export type IndicatorParameters = SMAIndicatorParameters | EMAIndicatorParameters | RSIIndicatorParameters | MACDIndicatorParameters | ATRIndicatorParameters | PriceIndicatorParameters  | AverageGainIndicatorParameters | AverageLossIndicatorParameters;
export type IndicatorInput = SMAIndicatorInput | EMAIndicatorInput | RSIIndicatorInput | MACDIndicatorInput | ATRIndicatorInput | PriceIndicatorInput | AverageGainIndicatorInput | AverageLossIndicatorInput;
export type IndicatorOutput = SMAIndicatorOutput | EMAIndicatorOutput | RSIIndicatorOutput | MACDIndicatorOutput | ATRIndicatorOutput | PriceIndicatorOutput | AverageGainIndicatorOutput | AverageLossIndicatorOutput;
export type IndicatorMethod = (parameters : {candle: Candle, values: IndicatorOutput[], lastValue: IndicatorOutput, lastIndex: number }) => IndicatorOutput;
export interface Values { values: number[]; }
