import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface EMAIndicatorParameters {
  period: number
}

export type EMAIndicatorOutput = number;
export type EMAIndicatorInput = number;

export type EMAMethodParameters = {
  candle: Candle,
  values: EMAIndicatorOutput[],
  lastValue: EMAIndicatorOutput,
  lastIndex: number
}
export type EMAMethod =  (parameters: EMAMethodParameters) => EMAIndicatorOutput;
export type EMAMethodBuilder = (parameters: EMAIndicatorParameters) => EMAMethod;
export interface EMAIndicator {
  name : "ema";
  method : EMAMethod;
  parameters : EMAIndicatorParameters
}

