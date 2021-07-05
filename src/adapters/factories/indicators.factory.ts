import { Indicator } from "../../domain/entities/indicator";
import { SMAIndicatorParameters, SMAIndicatorTriggerValidator } from "../../domain/port/entities/indicators/sma.port";
import * as IndicatorsRepository from "technicalindicators";
import { IndicatorsFactoryInterface, IndicatorsFactoryProps } from "../../domain/port/factories/indicators.factory.port";
import { EMAIndicatorParameters, EMAIndicatorTriggerValidator } from "../../domain/port/entities/indicators/ema.port";
import { RSIIndicatorParameters, RSIIndicatorTriggerValidator } from "../../domain/port/entities/indicators/rsi.port";
import { MACDIndicatorParameters, MACDIndicatorTriggerValidator } from "../../domain/port/entities/indicators/macd.port";
import { ATRIndicatorParameters, ATRIndicatorTriggerValidator } from "../../domain/port/entities/indicators/atr.port";
import { IndicatorDependencies } from "../../domain/port/entities/indicator.port";
import { Candle } from "../../domain/entities/candle";
import { PriceIndicatorParameters } from "../../domain/port/entities/indicators/price.port";
import { IndicatorMethodParametersMapper } from "../mappers/indicator-method.mapper";
import { v4 as uuid } from "uuid";

export class Indicators implements IndicatorsFactoryInterface {

  private dependencies : IndicatorsFactoryProps = { mapper: new IndicatorMethodParametersMapper(), uuid }
  indicatorDependencies:IndicatorDependencies = { mapper: this.dependencies.mapper };

  triggers = {
    sma: ["value"],
    ema: ["value"],
    rsi: ["value"],
    atr: ["value"],
    macd: ["MACD", "signal", "histogram"],
  };

  sma(parameters: SMAIndicatorParameters): Indicator {
    const sma = new IndicatorsRepository.SMA({ ...parameters, values: [] });
    return new Indicator({ name: "sma", method: sma.nextValue, parameters }, this.indicatorDependencies);
  }
  ema(parameters: EMAIndicatorParameters): Indicator {
    const ema = new IndicatorsRepository.EMA({ ...parameters, values: [] });
    return new Indicator({ name: "ema", method: ema.nextValue, parameters }, this.indicatorDependencies);
  }
  rsi(parameters: RSIIndicatorParameters): Indicator {
    const rsi = new IndicatorsRepository.RSI({ ...parameters, values: [] });
    return new Indicator({ name: "rsi", method: rsi.nextValue, parameters }, this.indicatorDependencies);
  }
  macd(parameters: MACDIndicatorParameters): Indicator {
    const macd = new IndicatorsRepository.MACD({ ...parameters, values: [] });
    return new Indicator({ name: "macd", method: macd.nextValue, parameters }, this.indicatorDependencies);
  }
  atr(parameters: ATRIndicatorParameters): Indicator {
    const atr = new IndicatorsRepository.ATR({ ...parameters, low: [], high: [], close: [] });
    return new Indicator({ name: "atr", method: atr.nextValue, parameters }, this.indicatorDependencies);
  }
  price(parameters : PriceIndicatorParameters): Indicator {
    return new Indicator({ name: "price", method: (price:number) => price, parameters }, this.indicatorDependencies);
  }

}


