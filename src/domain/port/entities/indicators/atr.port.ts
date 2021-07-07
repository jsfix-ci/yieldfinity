import { Candle } from "../../../entities";
import { IndicatorMethod } from "../indicator.port";
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

export type ATRMethodParameters = {
  candle: Candle,
  values: ATRIndicatorOutput[],
  lastValue: ATRIndicatorOutput,
  lastIndex: number
}
export type ATRMethod =  (parameters: ATRMethodParameters) => ATRIndicatorOutput;
export type ATRMethodBuilder = (parameters: ATRIndicatorParameters) => ATRMethod;
export interface ATRIndicator {
  name : "atr";
  method : ATRMethod;
  parameters : ATRIndicatorParameters
}


