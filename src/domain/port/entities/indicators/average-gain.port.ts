import { Candle } from "../../../entities";

export interface AverageGainIndicatorParameters {
  period: number
}

export type AverageGainIndicatorOutput = number;
export type AverageGainIndicatorInput = number;

export type AverageGainMethodParameters = {
  candle: Candle,
  values: AverageGainIndicatorOutput[],
  lastValue: AverageGainIndicatorOutput,
  lastIndex: number
}
export type AverageGainMethod =  (parameters: AverageGainMethodParameters) => AverageGainIndicatorOutput;
export type AverageGainMethodBuilder = (parameters: AverageGainIndicatorParameters) => AverageGainMethod;
export interface AverageGainIndicator {
  name : "average-gain";
  method : AverageGainMethod;
  parameters : AverageGainIndicatorParameters
}

