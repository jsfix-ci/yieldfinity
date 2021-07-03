import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface EMAIndicatorParameters {
  period: number
}

export type EMAIndicatorOutput = number;
export type EMAIndicatorInput = number;
export interface EMAMethod {
  (price : EMAIndicatorInput): EMAIndicatorOutput;
};

export interface EMAIndicator {
  name : "ema";
  method : EMAMethod;
  parameters : EMAIndicatorParameters
}

export type EMAIndicatorTriggerValidator = (output : EMAIndicatorOutput) => Position[]
