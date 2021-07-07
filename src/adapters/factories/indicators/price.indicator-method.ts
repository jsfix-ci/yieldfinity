import { PriceIndicatorParameters, PriceMethodBuilder, PriceMethodParameters } from "../../../domain";

const Price:PriceMethodBuilder = (parameters: PriceIndicatorParameters) => {
  return ({ candle }: PriceMethodParameters) => {
   return parameters.mode === "high" ? candle.high : parameters.mode === "low" ? candle.low : parameters.mode === "open" ? candle.open : candle.close;
  }
}

export default Price;