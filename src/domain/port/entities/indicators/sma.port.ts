import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface SMAIndicatorParameters {
  period: number
}

export type SMAIndicatorOutput = number;
export type SMAIndicatorInput = number;

export interface SMAMethod {
  (price : SMAIndicatorInput): SMAIndicatorOutput;
};

export interface SMAIndicator {
  name : "sma";
  method : SMAMethod;
  parameters : SMAIndicatorParameters
}

export type SMAIndicatorTriggerValidator = (output : SMAIndicatorOutput) => Position[]