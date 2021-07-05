import { Candle, RSIIndicatorOutput, RSIIndicatorParameters, RSIMethod } from "../../../domain";

const RSI: RSIMethod = (
  parameters: RSIIndicatorParameters,
  candle: Candle,
  values: RSIIndicatorOutput[],
  lastValue: RSIIndicatorOutput,
  lastIndex: number) => {
    return 0;
}

export default RSI;