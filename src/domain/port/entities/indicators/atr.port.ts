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

export type ATRMethod = (parameters: ATRIndicatorParameters) => Generator<ATRIndicatorOutput>;

export interface ATRIndicator {
  name : "atr";
  method : Generator<ATRIndicatorOutput>;
  parameters : ATRIndicatorParameters;
}

