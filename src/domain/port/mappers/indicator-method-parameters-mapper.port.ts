import { Candle } from "../../entities/candle";
import { Values } from "../entities/indicator.port";
import { ATRIndicatorOutput, ATRIndicatorParameters, ATRIndicatorInput } from "../entities/indicators/atr.port";
import { EMAIndicatorInput, EMAIndicatorOutput, EMAIndicatorParameters } from "../entities/indicators/ema.port";
import { MACDIndicatorInput, MACDIndicatorOutput, MACDIndicatorParameters } from "../entities/indicators/macd.port";
import { PriceIndicatorInput, PriceIndicatorMode, PriceIndicatorParameters } from "../entities/indicators/price.port";
import { RSIIndicatorInput, RSIIndicatorOutput, RSIIndicatorParameters } from "../entities/indicators/rsi.port";
import { SMAIndicatorInput, SMAIndicatorOutput, SMAIndicatorParameters } from "../entities/indicators/sma.port";


export interface IndicatorMethodParametersMapperInterface {
  sma(candle: Candle): SMAIndicatorInput;
  ema(candle: Candle): EMAIndicatorInput;
  rsi(candle: Candle): RSIIndicatorInput;
  macd(candle: Candle): MACDIndicatorInput;
  atr(candle: Candle): ATRIndicatorInput;
  price(candle: Candle, parameters: PriceIndicatorParameters): PriceIndicatorInput;
}