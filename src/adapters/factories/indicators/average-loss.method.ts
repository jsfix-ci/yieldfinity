import { AverageLossIndicatorParameters, AverageLossMethodBuilder, AverageLossMethodParameters } from "../../../domain/port/entities/indicators/average-loss.port";

const AverageLoss:AverageLossMethodBuilder = (parameters: AverageLossIndicatorParameters) => {
  let lossSum = 0, avgLoss, loss;
  var counter = 1;
  return ({ candle, lastValue }: AverageLossMethodParameters) => {
    loss = lastValue - candle.close;
    loss = loss > 0 ? loss : 0;
    if (loss > 0) {
        lossSum = lossSum + loss;
    }
    if (counter < parameters.period) {
        counter++;
    }
    else if (avgLoss === undefined) {
        avgLoss = lossSum / parameters.period;
    }
    else {
        avgLoss = ((avgLoss * (parameters.period - 1)) + loss) / parameters.period;
    }
    avgLoss = (avgLoss !== undefined) ? avgLoss : undefined;
    return avgLoss;
  }
}

export default AverageLoss;