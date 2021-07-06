import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface RSIIndicatorParameters {
  period: number
}

export type RSIIndicatorOutput = number;
export type RSIIndicatorInput = number;

export type RSIMethod = (parameters: RSIIndicatorParameters) => Generator<RSIIndicatorOutput>;

export interface RSIIndicator {
  name : "rsi";
  method : Generator<RSIIndicatorOutput>;
  parameters : RSIIndicatorParameters
}

