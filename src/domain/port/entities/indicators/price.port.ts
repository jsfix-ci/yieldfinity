import { Position } from "../orders/position.port";

export type PriceIndicatorMode = "high" | "low" | "open" | "close";

export interface PriceIndicatorParameters {
  mode : PriceIndicatorMode;
}

export type PriceIndicatorInput = number;

export type PriceIndicatorOutput = number;

export interface PriceMethod {
  (prices : PriceIndicatorInput): PriceIndicatorOutput;
};

export interface PriceIndicator {
  name : "price";
  method : PriceMethod;
  parameters : PriceIndicatorParameters;
}

export type PriceIndicatorTriggerValidator = (output : PriceIndicatorOutput) => Position[]
