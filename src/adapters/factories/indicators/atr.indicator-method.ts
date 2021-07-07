import { Candle, ATRIndicatorOutput, ATRIndicatorParameters, ATRMethod, ATRMethodBuilder, ATRMethodParameters } from "../../../domain";

const ATR:ATRMethodBuilder = (parameters: ATRIndicatorParameters) => {
  return ({ candle }: ATRMethodParameters) => {
    return 1;
   }
}

export default ATR;