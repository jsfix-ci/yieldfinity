import { Indicator } from "../../entities/indicator";
import { SMATrigger } from "../../entities/triggers/sma.trigger";
import { ATRIndicatorOutput, ATRIndicatorParameters, ATRIndicatorTriggerValidator } from "../entities/indicators/atr.port";
import { EMAIndicatorOutput, EMAIndicatorParameters, EMAIndicatorTriggerValidator } from "../entities/indicators/ema.port";
import { MACDIndicatorOutput, MACDIndicatorParameters, MACDIndicatorTriggerValidator } from "../entities/indicators/macd.port";
import { PriceIndicatorParameters } from "../entities/indicators/price.port";
import { RSIIndicatorOutput, RSIIndicatorParameters, RSIIndicatorTriggerValidator } from "../entities/indicators/rsi.port";
import { SMAIndicatorOutput, SMAIndicatorParameters, SMAIndicatorTriggerValidator } from "../entities/indicators/sma.port";
import { Position } from "../entities/orders/position.port";
import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";

export interface IndicatorsFactoryProps {
  mapper: IndicatorMethodParametersMapperInterface;
  uuid() : string;
}

export interface IndicatorTriggersMap {
  [indicator: string] : string[];
}



export interface IndicatorsFactoryInterface {

  sma(parameters: SMAIndicatorParameters): Indicator;
  ema(parameters: EMAIndicatorParameters): Indicator;
  rsi(parameters: RSIIndicatorParameters): Indicator;
  macd(parameters: MACDIndicatorParameters): Indicator;
  atr(parameters: ATRIndicatorParameters): Indicator;
  price(parameters: PriceIndicatorParameters): Indicator;
  triggers : IndicatorTriggersMap;
}