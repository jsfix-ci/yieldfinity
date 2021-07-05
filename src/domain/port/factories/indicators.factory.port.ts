import { Indicator } from "../../entities/indicator";
import { ATRIndicatorParameters } from "../entities/indicators/atr.port";
import { EMAIndicatorParameters } from "../entities/indicators/ema.port";
import { MACDIndicatorParameters } from "../entities/indicators/macd.port";
import { PriceIndicatorParameters } from "../entities/indicators/price.port";
import { RSIIndicatorParameters } from "../entities/indicators/rsi.port";
import { SMAIndicatorParameters } from "../entities/indicators/sma.port";
import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";

export interface IndicatorsFactoryProps {
  mapper: IndicatorMethodParametersMapperInterface;
  uuid() : string;
}

export interface IndicatorTriggersMap {
  [indicator: string] : string[];
}



export interface IndicatorsFactoryInterface {
  
  price(parameters: PriceIndicatorParameters): Indicator;
  sma(parameters: SMAIndicatorParameters): Indicator;
  ema(parameters: EMAIndicatorParameters): Indicator;
  rsi(parameters: RSIIndicatorParameters): Indicator;
  macd(parameters: MACDIndicatorParameters): Indicator;
  atr(parameters: ATRIndicatorParameters): Indicator;
  triggers : IndicatorTriggersMap;
}