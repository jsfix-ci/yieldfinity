import { Candle } from "../../../entities";

export interface SMAIndicatorParameters {
  period: number
}

export type SMAIndicatorOutput = number;
export type SMAIndicatorInput = number;

export type SMAMethod = (parameters: SMAIndicatorParameters, candle: Candle, values: SMAIndicatorOutput[], lastValue: SMAIndicatorOutput, lastIndex: number) => SMAIndicatorOutput;

export interface SMAIndicator {
  name : "sma";
  method : SMAMethod;
  parameters : SMAIndicatorParameters
}
