import { Candle } from "../../../entities";
import { Position } from "../orders/position.port";

export type PriceIndicatorMode = "high" | "low" | "open" | "close";

export interface PriceIndicatorParameters {
  mode : PriceIndicatorMode;
}

export type PriceIndicatorInput = number;

export type PriceIndicatorOutput = number;

export type PriceMethod = (parameters: PriceIndicatorParameters) => Generator<PriceIndicatorOutput>;

export interface PriceIndicator {
  name : "price";
  method : Generator<PriceIndicatorOutput>;
  parameters : PriceIndicatorParameters;
}

