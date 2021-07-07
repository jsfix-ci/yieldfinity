import { Indicator } from "../../domain/entities/indicator";
import { ATRIndicatorParameters } from "../../domain/port/entities/indicators/atr.port";
import { AverageGainIndicatorParameters } from "../../domain/port/entities/indicators/average-gain.port";
import { AverageLossIndicatorParameters } from "../../domain/port/entities/indicators/average-loss.port";
import { EMAIndicatorParameters } from "../../domain/port/entities/indicators/ema.port";
import { MACDIndicatorParameters } from "../../domain/port/entities/indicators/macd.port";
import { PriceIndicatorParameters } from "../../domain/port/entities/indicators/price.port";
import { RSIIndicatorParameters } from "../../domain/port/entities/indicators/rsi.port";
import { SMAIndicatorParameters } from "../../domain/port/entities/indicators/sma.port";
import { IndicatorsFactoryInterface } from "../../domain/port/factories/indicators.factory.port";
import ATR from "./indicators/atr.indicator-method";
import AverageGain from "./indicators/average-gain.method";
import AverageLoss from "./indicators/average-loss.method";
import EMA from "./indicators/ema.indicator-method";
import MACD from "./indicators/macd.indicator-method";
import Price from "./indicators/price.indicator-method";
import RSI from "./indicators/rsi.indicator-method";
import SMA from "./indicators/sma.indicator-method";

export class Indicators implements IndicatorsFactoryInterface {
  
  triggers = {
    sma: ["value"],
    ema: ["value"],
    rsi: ["value"],
    atr: ["value"],
    macd: ["MACD", "signal", "histogram"],
  };
  
  sma(parameters: SMAIndicatorParameters): Indicator {
    return new Indicator({ name: "sma", method: SMA(parameters), parameters });
  }
  ema(parameters: EMAIndicatorParameters): Indicator {
    return new Indicator({ name: "ema", method: EMA(parameters), parameters });
  }
  rsi(parameters: RSIIndicatorParameters): Indicator {
    return new Indicator({ name: "rsi", method: RSI(parameters), parameters });
  }
  macd(parameters: MACDIndicatorParameters): Indicator {
    return new Indicator({ name: "macd", method: MACD(parameters), parameters });
  }
  // atr(parameters: ATRIndicatorParameters): Indicator {
  //   return new Indicator({ name: "atr", method: ATR(parameters), parameters });
  // }
  price(parameters : PriceIndicatorParameters): Indicator {
    return new Indicator({ name: "price", method: Price(parameters), parameters });
  }
  averageGain(parameters: AverageGainIndicatorParameters): Indicator {
    return new Indicator({ name: "average-gain", method: AverageGain(parameters), parameters });
  }
  averageLoss(parameters: AverageLossIndicatorParameters): Indicator {
    return new Indicator({ name: "average-loss", method: AverageLoss(parameters), parameters });
  }

}


