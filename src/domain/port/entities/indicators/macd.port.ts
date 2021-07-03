import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface MACDIndicatorParameters {
  SimpleMAOscillator: boolean;
  SimpleMASignal: boolean;
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
}

export type MACDIndicatorOutput = {
  MACD?: number;
  signal?: number;
  histogram?: number;
};

export type MACDIndicatorInput = number;

export interface MACDMethod {
  (price : MACDIndicatorInput): MACDIndicatorOutput;
};

export interface MACDIndicator {
  name : "macd";
  method : MACDMethod;
  parameters : MACDIndicatorParameters
}

export type MACDIndicatorTriggerValidator = (output : MACDIndicatorOutput) => Position[]
