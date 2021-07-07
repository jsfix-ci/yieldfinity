import { Candle, MACDIndicatorParameters, MACDMethodBuilder, MACDMethodParameters } from "../../../domain";
import { Indicators } from "../indicators.factory";
import { ema } from "./ema.indicator-method";

const MACD:MACDMethodBuilder = (parameters: MACDIndicatorParameters) => {
  const indicators = new Indicators();
  const fastEma = indicators.ema({ period : parameters.fastPeriod });
  const slowEma = indicators.ema({ period : parameters.slowPeriod });
  let signal = 0;
  return ({ candle }: MACDMethodParameters) => {
    fastEma.generate(candle)
    slowEma.generate(candle)
    const macd = (fastEma.lastValue as number) - (slowEma.lastValue as number);
    signal = ema(parameters.signalPeriod, signal, macd, parameters.emaSmoothing);
    return { MACD: macd, signal, histogram: macd - signal };
  }
}

export default MACD;