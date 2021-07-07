import { Candle } from "../../../domain";
import { AverageGainIndicatorParameters, AverageGainMethodBuilder, AverageGainMethodParameters } from "../../../domain/port/entities/indicators/average-gain.port";

const AverageGain:AverageGainMethodBuilder = (parameters: AverageGainIndicatorParameters) => {
  const candles: Candle[] = [];
  let gainSum = 0;
  return ({ candle, lastValue, lastIndex }: AverageGainMethodParameters) => {
    if (lastIndex >= parameters.period) {
      candles.shift();
    };
    candles.push(candle);
    const gain = candle.close - candles[0].close;
    if (gain > 0) gainSum += gain;
    return gainSum / candles[0].close * 100;
  }
}

export default AverageGain;