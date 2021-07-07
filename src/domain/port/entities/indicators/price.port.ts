import { Candle } from "../../../entities";
import { Position } from "../orders/position.port";

export type PriceIndicatorMode = "high" | "low" | "open" | "close";

export interface PriceIndicatorParameters {
  mode : PriceIndicatorMode;
}

export type PriceIndicatorInput = number;

export type PriceIndicatorOutput = number;

export type PriceMethodParameters = {
  candle: Candle,
  values: PriceIndicatorOutput[],
  lastValue: PriceIndicatorOutput,
  lastIndex: number
}
export type PriceMethod =  (parameters: PriceMethodParameters) => PriceIndicatorOutput;
export type PriceMethodBuilder = (parameters: PriceIndicatorParameters) => PriceMethod;
export interface PriceIndicator {
  name : "price";
  method : PriceMethod;
  parameters : PriceIndicatorParameters
}

