import { Candle, PriceIndicatorOutput, PriceIndicatorParameters, PriceMethod } from "../../../domain";

const Price: PriceMethod = (
  parameters: PriceIndicatorParameters,
  candle: Candle,
  values: PriceIndicatorOutput[],
  lastValue: PriceIndicatorOutput,
  lastIndex: number) => {
    return parameters.mode === "high" ? candle.high : parameters.mode === "open" ? candle.open : parameters.mode === "low" ? candle.low : candle.close;
}

export default Price;