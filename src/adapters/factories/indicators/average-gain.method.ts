import { AverageGainIndicatorParameters, AverageGainMethodBuilder, AverageGainMethodParameters } from "../../../domain/port/entities/indicators/average-gain.port";

const AverageGain:AverageGainMethodBuilder = (parameters: AverageGainIndicatorParameters) => {
  let gainSum = 0, avgGain, gain;
  var counter = 1;
  return ({ candle, lastValue }: AverageGainMethodParameters) => {
    gain = candle.close - lastValue || 0;
    gain = gain > 0 ? gain : 0;
    if (gain > 0) {
        gainSum = gainSum + gain;
    }
    if (counter < parameters.period) {
        counter++;
    }
    else if (avgGain === undefined) {
        avgGain = gainSum / parameters.period;
    }
    else {
        avgGain = ((avgGain * (parameters.period - 1)) + gain) / parameters.period;
    }
    avgGain = (avgGain !== undefined) ? avgGain : undefined;
    return avgGain;
  }
}

export default AverageGain;