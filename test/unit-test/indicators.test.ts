import { Indicators } from "../../src/adapters";
import { Candle, ExchangePair } from "../../src/domain";
import candles from "../mockdata/candles";

describe("Should generate the indicators", () => { 
  it("sma indicator", async () => { 
    const candles = [
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 5, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 14, close: 15, high: 15.5, low: 13.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 19, close: 20, high: 20.5, low: 18.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 25, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
    ]
    const sma = new Indicators().sma({ period : 5 });
    candles.map(sma.generate);
    expect(sma.values).toEqual([null, null, null, null, 15])
  })

  it("price indicator", async () => { 
    const candles = [
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 5, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 14, close: 15, high: 15.5, low: 13.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 19, close: 20, high: 20.5, low: 18.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 25, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
    ]
    const price = new Indicators().price({ mode : "close" });
    candles.map(price.generate);
    expect(price.values).toEqual([5, 10, 15, 20, 25])
  })

  it.skip("rsi indicator", async () => { 
    const rsi = new Indicators().rsi({ period : 12 });
    candles.map(rsi.generate);
  })

  it.skip("atr indicator", async () => { 
    const atr = new Indicators().atr({ period : 12 });
    candles.map(atr.generate);
  })

  it.skip("ema indicator", async () => { 
    const ema = new Indicators().ema({ period : 12 });
    candles.map(ema.generate);
  })

  it.skip("macd indicator", async () => { 
    const macd = new Indicators().macd({ SimpleMAOscillator : true, SimpleMASignal: true, fastPeriod : 12, signalPeriod : 12, slowPeriod : 6 });
    candles.map(macd.generate);
  })
})
