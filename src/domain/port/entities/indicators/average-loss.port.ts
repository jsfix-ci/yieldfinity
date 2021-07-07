import { Candle } from "../../../entities";

export interface AverageLossIndicatorParameters {
  period: number
}

export type AverageLossIndicatorOutput = number;
export type AverageLossIndicatorInput = number;

export type AverageLossMethodParameters = {
  candle: Candle,
  values: AverageLossIndicatorOutput[],
  lastValue: AverageLossIndicatorOutput,
  lastIndex: number
}
export type AverageLossMethod =  (parameters: AverageLossMethodParameters) => AverageLossIndicatorOutput;
export type AverageLossMethodBuilder = (parameters: AverageLossIndicatorParameters) => AverageLossMethod;
export interface AverageLossIndicator {
  name : "average-loss";
  method : AverageLossMethod;
  parameters : AverageLossIndicatorParameters
}

