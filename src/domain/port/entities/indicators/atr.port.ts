import { Position } from "../orders/position.port";

export interface ATRIndicatorParameters {
  period: number;
}

export interface ATRIndicatorInput {
  low: number;
  high: number;
  close: number;
}

export type ATRIndicatorOutput = number;

export interface ATRMethod {
  (prices : ATRIndicatorInput): ATRIndicatorOutput;
};

export interface ATRIndicator {
  name : "atr";
  method : ATRMethod;
  parameters : ATRIndicatorParameters;
}

export type ATRIndicatorTriggerValidator = (output : ATRIndicatorOutput) => Position[]
