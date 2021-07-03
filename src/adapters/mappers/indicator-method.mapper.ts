import CandlestickFinder from "technicalindicators/declarations/candlestick/CandlestickFinder";
import { Candle } from "../../domain/entities/candle";
import { ATRIndicatorInput } from "../../domain/port/entities/indicators/atr.port";
import { EMAIndicatorInput } from "../../domain/port/entities/indicators/ema.port";
import { MACDIndicatorInput } from "../../domain/port/entities/indicators/macd.port";
import { PriceIndicatorInput, PriceIndicatorMode, PriceIndicatorParameters } from "../../domain/port/entities/indicators/price.port";
import { RSIIndicatorInput } from "../../domain/port/entities/indicators/rsi.port";
import { SMAIndicatorInput } from "../../domain/port/entities/indicators/sma.port";
import { IndicatorMethodParametersMapperInterface } from "../../domain/port/mappers/indicator-method-parameters-mapper.port";

export class IndicatorMethodParametersMapper implements IndicatorMethodParametersMapperInterface {
  sma = (candle: Candle): SMAIndicatorInput => candle.open;
  ema = (candle: Candle): EMAIndicatorInput => candle.open;
  rsi = (candle: Candle): RSIIndicatorInput => candle.open;
  macd = (candle: Candle): MACDIndicatorInput => candle.open;
  atr = (candle: Candle): ATRIndicatorInput => ({ high: candle.high, low: candle.low, close : candle.close });
  price = (candle: Candle, parameters: PriceIndicatorParameters): PriceIndicatorInput => parameters.mode === "high" ? candle.high : parameters.mode === "close" ? candle.close : parameters.mode === "open" ? candle.open : candle.close;
}