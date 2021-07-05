import { Candle, ATRIndicatorOutput, ATRIndicatorParameters, ATRMethod } from "../../../domain";

const ATR: ATRMethod = (
  parameters: ATRIndicatorParameters,
  candle: Candle,
  values: ATRIndicatorOutput[],
  lastValue: ATRIndicatorOutput,
  lastIndex: number) => {
    return 0;
}

export default ATR;