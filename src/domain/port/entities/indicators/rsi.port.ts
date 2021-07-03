import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface RSIIndicatorParameters {
  period: number
}

export type RSIIndicatorOutput = number;
export type RSIIndicatorInput = number;

export interface RSIMethod {
  (price : RSIIndicatorInput): RSIIndicatorOutput;
};

export interface RSIIndicator {
  name : "rsi";
  method : RSIMethod;
  parameters : RSIIndicatorParameters
}

export type RSIIndicatorTriggerValidator = (output : RSIIndicatorOutput) => Position[]
