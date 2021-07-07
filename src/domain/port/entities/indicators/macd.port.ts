import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface MACDIndicatorParameters {
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
  emaSmoothing?: number;
}

export type MACDIndicatorOutput = {
  MACD?: number;
  signal?: number;
  histogram?: number;
};

export type MACDIndicatorInput = number;

export type MACDMethodParameters = {
  candle: Candle,
  values: MACDIndicatorOutput[],
  lastValue: MACDIndicatorOutput,
  lastIndex: number
}
export type MACDMethod =  (parameters: MACDMethodParameters) => MACDIndicatorOutput;
export type MACDMethodBuilder = (parameters: MACDIndicatorParameters) => MACDMethod;
export interface MACDIndicator {
  name : "macd";
  method : MACDMethod;
  parameters : MACDIndicatorParameters
}
