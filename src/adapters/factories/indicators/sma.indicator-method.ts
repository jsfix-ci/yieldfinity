import { Candle, SMAIndicatorOutput, SMAIndicatorParameters, SMAMethod } from "../../../domain";

const SMA: SMAMethod = (
  parameters: SMAIndicatorParameters,
  candle: Candle,
  values: SMAIndicatorOutput[],
  lastValue: SMAIndicatorOutput,
  lastIndex: number) => {
    return Math.random();
}

export default SMA;