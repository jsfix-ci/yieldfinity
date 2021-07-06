import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface EMAIndicatorParameters {
  period: number
}

export type EMAIndicatorOutput = number;
export type EMAIndicatorInput = number;

export type EMAMethod = (parameters: EMAIndicatorParameters) => Generator<EMAIndicatorOutput>

export interface EMAIndicator {
  name : "ema";
  method : Generator<EMAIndicatorOutput>;
  parameters : EMAIndicatorParameters
}

