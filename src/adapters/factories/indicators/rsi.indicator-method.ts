import { Candle, RSIIndicatorOutput, RSIIndicatorParameters, RSIMethod, RSIMethodBuilder, RSIMethodParameters } from "../../../domain";
import { Indicators } from "../indicators.factory";

const RSI:RSIMethodBuilder = (parameters: RSIIndicatorParameters) => {
  const indicator = new Indicators();
  const gain = indicator.averageGain({ period: parameters.period });
  const loss = indicator.averageLoss({ period: parameters.period });
  return ({ candle }: RSIMethodParameters) => {
    gain.generate(candle);
    loss.generate(candle);
    const gainValue = gain.lastValue as number;
    const lossValue = loss.lastValue as number;
    return 100 - 100 / (1 + gainValue / lossValue)
  }
}

export default RSI;