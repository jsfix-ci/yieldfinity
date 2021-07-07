import { Indicators } from "../../src/adapters";
import { Candle, ExchangePair, MACDIndicatorOutput } from "../../src/domain";
import mockCandles from "../mockdata/candles";
import { macd, sma, ema } from "technicalindicators";


describe("Should generate the indicators", () => { 
  it("sma indicator", async () => {
    const candles = mockCandles.slice(0, 1000)
    const yieldfinitySma = new Indicators().sma({ period : 3 });
    const technicalindicatorsSma = sma({ period : 3, values: candles.map(candle => candle.close) });
    candles.map(yieldfinitySma.generate);
    expect(
      yieldfinitySma.values.slice(yieldfinitySma.values.length - 900, yieldfinitySma.values.length).map((v: any) => Math.floor(v))
    ).toEqual(
      technicalindicatorsSma.slice(technicalindicatorsSma.length - 900, technicalindicatorsSma.length).map((v: any) => Math.floor(v))
    )
  })

  it("price indicator", async () => { 
    const closePrice = new Indicators().price({ mode : "close" });
    const openPrice = new Indicators().price({ mode : "open" });
    const lowPrice = new Indicators().price({ mode : "low" });
    const highPrice = new Indicators().price({ mode : "high" });
    mockCandles.map(closePrice.generate);
    mockCandles.map(openPrice.generate);
    mockCandles.map(lowPrice.generate);
    mockCandles.map(highPrice.generate);
    expect(closePrice.values).toEqual(mockCandles.map(candle => candle.close))
    expect(openPrice.values).toEqual(mockCandles.map(candle => candle.open))
    expect(lowPrice.values).toEqual(mockCandles.map(candle => candle.low))
    expect(highPrice.values).toEqual(mockCandles.map(candle => candle.high))
  })

  it("rsi indicator", async () => { 
    const candles = [
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 10, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 14, close: 15, high: 15.5, low: 13.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 19, close: 20, high: 20.5, low: 18.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 20, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 10, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 10, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 10, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 24, close: 1, high: 25.5, low: 23.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
    ];
    const rsi = new Indicators().rsi({ period : 14 });
    candles.map(rsi.generate);
    expect(rsi.values).toEqual([null, null, 100, 100, 100, 100, 100, 100, 73.52941176470588])
  })

  it.skip("atr indicator", async () => { 
    // const atr = new Indicators().atr({ period : 12 });
    // mockCandles.map(atr.generate);
  })

  it("ema indicator", async () => { 
    const yieldfinityEma = new Indicators().ema({ period : 5 });
    const technicalindicatorsEma = ema({ period : 5, values: mockCandles.map(candle => candle.close) });
    mockCandles.map(yieldfinityEma.generate);
    expect(
      yieldfinityEma.values.slice(yieldfinityEma.values.length - 8000, yieldfinityEma.values.length).map((v: any) => Math.floor(v))
    ).toEqual(
      technicalindicatorsEma.slice(technicalindicatorsEma.length - 8000, technicalindicatorsEma.length).map((v: any) => Math.floor(v))
    )
  })

  it("macd indicator", async () => { 
    const MACD = new Indicators().macd({ fastPeriod : 12, signalPeriod : 9, slowPeriod : 26 });
    const m = macd({ fastPeriod : 12, signalPeriod : 9, slowPeriod : 26, values: mockCandles.map(candle => candle.close), SimpleMASignal: false, SimpleMAOscillator: false });
    
    mockCandles.map(MACD.generate);
    
    expect(
      m.slice(m.length - 8400, m.length).map(v => Math.floor(v.MACD))
    ).toEqual(
      MACD.values.slice(MACD.values.length - 8400, MACD.values.length).map((v: any) => Math.floor(v.MACD))) }
    )
})
