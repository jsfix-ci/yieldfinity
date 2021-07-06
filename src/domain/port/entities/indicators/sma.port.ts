import { Candle } from "../../../entities";

export interface SMAIndicatorParameters {
  period: number
}

export type SMAIndicatorOutput = number;
export type SMAIndicatorInput = number;

export type SMAMethod = (parameters: SMAIndicatorParameters) => Generator<SMAIndicatorOutput>

export interface SMAIndicator {
  name : "sma";
  method : Generator<SMAIndicatorOutput>;
  parameters : SMAIndicatorParameters
}
