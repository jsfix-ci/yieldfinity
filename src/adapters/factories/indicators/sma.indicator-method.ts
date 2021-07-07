import { Candle, SMAIndicatorOutput, SMAIndicatorParameters, SMAMethodBuilder, SMAMethodParameters } from "../../../domain";

const SMA:SMAMethodBuilder = (parameters: SMAIndicatorParameters) => {
  const candles = [];
  let sum = 0;
  return ({ candle, lastIndex, lastValue }: SMAMethodParameters) => {
    if (lastIndex >= parameters.period) candles.shift();
    candles.push(candle);
    sum = candles.reduce((sum, candle) => sum += candle.close, 0);
    return sum / (lastIndex >= parameters.period ? parameters.period : candles.length);
  }
}

export default SMA;