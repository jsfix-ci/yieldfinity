import { Candle } from "../../../entities";
import { Values } from "../indicator.port";
import { Position } from "../orders/position.port";

export interface MACDIndicatorParameters {
  SimpleMAOscillator: boolean;
  SimpleMASignal: boolean;
  fastPeriod: number;
  slowPeriod: number;
  signalPeriod: number;
}

export type MACDIndicatorOutput = {
  MACD?: number;
  signal?: number;
  histogram?: number;
};

export type MACDIndicatorInput = number;

export type MACDMethod = (parameters: MACDIndicatorParameters) => Generator<MACDIndicatorOutput>;

export interface MACDIndicator {
  name : "macd";
  method : Generator<MACDIndicatorOutput>;
  parameters : MACDIndicatorParameters
}

