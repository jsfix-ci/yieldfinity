import { Candle, EMAIndicatorOutput, EMAIndicatorParameters, EMAMethod } from "../../../domain";

const EMA: EMAMethod = (
  parameters: EMAIndicatorParameters,
  candle: Candle,
  values: EMAIndicatorOutput[],
  lastValue: EMAIndicatorOutput,
  lastIndex: number) => {
    return 0;
}

export default EMA;