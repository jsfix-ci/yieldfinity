import { Candle, RSIIndicatorOutput, RSIIndicatorParameters, RSIMethod, RSIMethodBuilder, RSIMethodParameters } from "../../../domain";
import { Indicators } from "../indicators.factory";

const RSI:RSIMethodBuilder = (parameters: RSIIndicatorParameters) => {
  // const indicator = new Indicators();
  // const gain = indicator.averageGain({ period: parameters.period });
  // const loss = indicator.averageLoss({ period: parameters.period });
  // let RS = 0, currentRSI = 0;
  return ({ candle }: RSIMethodParameters) => {
    // gain.generate(candle);
    // loss.generate(candle);
    // if ((gain.lastValue !== null) && (loss.lastValue !== null)) {
    //     if (loss.lastValue === 0) {
    //         currentRSI = 100;
    //     }
    //     else if (gain.lastValue === 0) {
    //         currentRSI = 0;
    //     }
    //     else {
    //         RS = (gain.lastValue as number) / (loss.lastValue as number);
    //         RS = isNaN(RS) ? 0 : RS;
    //         currentRSI = parseFloat((100 - (100 / (1 + RS))).toFixed(2));
    //     }
    // }
    // return currentRSI;
    return 1
  }
}

export default RSI;