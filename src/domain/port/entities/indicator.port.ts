import { IndicatorMethodParametersMapperInterface } from "../mappers/indicator-method-parameters-mapper.port";
import { ATRIndicator, ATRIndicatorOutput, ATRIndicatorInput, ATRIndicatorParameters } from "./indicators/atr.port";
import { EMAIndicator, EMAIndicatorOutput, EMAIndicatorInput, EMAIndicatorParameters } from "./indicators/ema.port";
import { MACDIndicator, MACDIndicatorOutput, MACDIndicatorInput, MACDIndicatorParameters } from "./indicators/macd.port";
import { RSIIndicator, RSIIndicatorOutput, RSIIndicatorInput, RSIIndicatorParameters } from "./indicators/rsi.port";
import { SMAIndicator, SMAIndicatorOutput, SMAIndicatorInput, SMAIndicatorParameters } from "./indicators/sma.port";
import { IndicatorTrigger } from "../../entities/triggers/indicator-trigger";
import { PriceIndicator, PriceIndicatorInput, PriceIndicatorOutput, PriceIndicatorParameters } from "./indicators/price.port";

// export const IndicatorNames = ["sma" , "ema" , "wma" , "wema" , "macd" , "rsi" , "bollingerbands" , "adx" , "atr" , "truerange" , "roc" , "kst" , "psar" , "stochastic" , "williamsr" , "adl" , "obv" , "trix" , "forceindex" , "cci" , "awesomeoscillator" , "vwap" , "volumeprofile" , "mfi" , "stochasticrsi" , "averagegain" , "averageloss" , "sd" , "highest" , "lowest" , "sum" , "FixedSizeLinkedList" , "renko" , "HeikinAshi" , "bullish" , "bearish" , "abandonedbaby" , "doji" , "bearishengulfingpattern" , "bullishengulfingpattern" , "darkcloudcover" , "downsidetasukigap" , "dragonflydoji" , "gravestonedoji" , "bullishharami" , "bearishharami" , "bullishharamicross" , "bearishharamicross" , "eveningdojistar" , "eveningstar" , "morningdojistar" , "morningstar" , "bullishmarubozu" , "bearishmarubozu" , "piercingline" , "bullishspinningtop" , "bearishspinningtop" , "threeblackcrows" , "threewhitesoldiers" , "bullishhammerstick" , "bearishhammerstick" , "bullishinvertedhammerstick" , "bearishinvertedhammerstick" , "hammerpattern" , "hammerpatternunconfirmed" , "hangingman" , "hangingmanunconfirmed" , "shootingstar" , "shootingstarunconfirmed" , "tweezertop" , "tweezerbottom" , "fibonacciretracement" , "ichimokucloud" , "keltnerchannels" , "chandelierexit" , "crossUp" , "crossDown"] as const;

export const IndicatorNames = ["sma", "ema", "rsi", "macd", "bearish", "bullish", "atr", "price"] as const;
export type IndicatorsName = typeof IndicatorNames[number];
export type IndicatorProps = SMAIndicator | EMAIndicator | RSIIndicator | MACDIndicator | ATRIndicator | PriceIndicator;
export type IndicatorParameters = SMAIndicatorParameters | EMAIndicatorParameters | RSIIndicatorParameters | MACDIndicatorParameters | ATRIndicatorParameters | PriceIndicatorParameters;
export type IndicatorInput = SMAIndicatorInput | EMAIndicatorInput | RSIIndicatorInput | MACDIndicatorInput | ATRIndicatorInput | PriceIndicatorInput;
export type IndicatorOutput = SMAIndicatorOutput | EMAIndicatorOutput | RSIIndicatorOutput | MACDIndicatorOutput | ATRIndicatorOutput | PriceIndicatorOutput;
export interface Values { values: number[]; }

export interface IndicatorDependencies {
  mapper: IndicatorMethodParametersMapperInterface;
}