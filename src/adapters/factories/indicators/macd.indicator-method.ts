import { Candle, MACDIndicatorOutput, MACDIndicatorParameters, MACDMethod } from "../../../domain";

const MACD: MACDMethod = (
  parameters: MACDIndicatorParameters,
  candle: Candle,
  values: MACDIndicatorOutput[],
  lastValue: MACDIndicatorOutput,
  lastIndex: number) => {
    return {
      MACD: 0,
      signal: 0,
      histogram: 0
    };
}

export default MACD;