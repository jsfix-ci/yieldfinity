import { Candle, SMAIndicatorOutput, SMAIndicatorParameters, SMAMethod } from "../../../domain";

const SMA:SMAMethod = (parameters: SMAIndicatorParameters) => {
  var genFn = (function* (period) {
    var list = [];
    var sum = 0;
    var counter = 1;
    var current = yield;
    var result;
    list.push(0);
    while (true) {
        if (counter < period) {
            counter++;
            list.push(current);
            sum = sum + current;
        }
        else {
            sum = sum - list.shift() + current;
            result = ((sum) / period);
            list.push(current);
        }
        current = yield result;
      }
  });
  const generator = genFn(parameters.period);
  generator.next();
  return generator;
}

export default SMA;