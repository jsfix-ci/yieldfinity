import { Candle } from "../../../domain";
import { AverageLossIndicatorParameters, AverageLossMethodBuilder, AverageLossMethodParameters } from "../../../domain/port/entities/indicators/average-loss.port";

const AverageLoss:AverageLossMethodBuilder = (parameters: AverageLossIndicatorParameters) => {
  const candles: Candle[] = [];
  let lossSum = 0;
  return ({ candle, lastValue, lastIndex }: AverageLossMethodParameters) => {
    if (lastIndex >= parameters.period) {
      candles.shift();
    };
    candles.push(candle);
    const loss = candle.close - candles[0].close;
    if (loss < 0) lossSum += Math.abs(loss);
    return lossSum / candles[0].close * 100;
  }
}

export default AverageLoss;