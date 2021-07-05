import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface RSIIndicatorParameters {
  period: number
}

export type RSIIndicatorOutput = number;
export type RSIIndicatorInput = number;

export type RSIMethod = (parameters: RSIIndicatorParameters, candle: Candle, values: RSIIndicatorOutput[], lastValue: RSIIndicatorOutput, lastIndex: number) => RSIIndicatorOutput;

export interface RSIIndicator {
  name : "rsi";
  method : RSIMethod;
  parameters : RSIIndicatorParameters
}

