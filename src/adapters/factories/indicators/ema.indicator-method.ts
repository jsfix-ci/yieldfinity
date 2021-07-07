import { EMAIndicatorParameters, EMAMethodBuilder, EMAMethodParameters } from "../../../domain";

const ema = (period: number, lastValue: number, price: number, smoothing: number = 2) => {
  const k = smoothing / (period + 1);
  return price * k + lastValue * (1 - k);
}

const EMA:EMAMethodBuilder = (parameters: EMAIndicatorParameters) => {
  return ({ candle, lastValue }: EMAMethodParameters) => ema(parameters.period, lastValue, candle.close)
}

export { ema };
export default EMA;