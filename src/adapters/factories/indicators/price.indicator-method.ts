import { Candle, PriceIndicatorOutput, PriceIndicatorParameters, PriceMethod } from "../../../domain";

const Price:PriceMethod = (parameters: PriceIndicatorParameters) => {
  var genFn = (function* (mode) {
    while(true) yield 1;
  });
  const generator = genFn(parameters.mode);
  generator.next();
  return generator;
}

export default Price;