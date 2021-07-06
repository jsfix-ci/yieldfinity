import { Candle, MACDIndicatorOutput, MACDIndicatorParameters, MACDMethod } from "../../../domain";

const MACD:MACDMethod = (parameters: MACDIndicatorParameters) => {
  var genFn = (function* (parameters) {
    while(true) yield {
      MACD:0, signal: 0, histogram: 0
    };
  });
  const generator = genFn(parameters);
  generator.next();
  return generator;
}

export default MACD;