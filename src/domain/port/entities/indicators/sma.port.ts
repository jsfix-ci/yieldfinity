import { Candle } from "../../../entities";

export interface SMAIndicatorParameters {
  period: number
}

export type SMAIndicatorOutput = number;
export type SMAIndicatorInput = number;
export type SMAMethodParameters = {
  candle: Candle,
  values: SMAIndicatorOutput[],
  lastValue: SMAIndicatorOutput,
  lastIndex: number
}

export type SMAMethod =  (parameters: SMAMethodParameters) => SMAIndicatorOutput;
export type SMAMethodBuilder = (parameters: SMAIndicatorParameters) => SMAMethod;
export interface SMAIndicator {
  name : "sma";
  method : SMAMethod;
  parameters : SMAIndicatorParameters
}
