import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface EMAIndicatorParameters {
  period: number
}

export type EMAIndicatorOutput = number;
export type EMAIndicatorInput = number;

export type EMAMethod = (parameters: EMAIndicatorParameters, candle: Candle, values: EMAIndicatorOutput[], lastValue: EMAIndicatorOutput, lastIndex: number) => EMAIndicatorOutput;

export interface EMAIndicator {
  name : "ema";
  method : EMAMethod;
  parameters : EMAIndicatorParameters
}

