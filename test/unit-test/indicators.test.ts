import { Indicators } from "../../src/adapters";
import { Candle, ExchangePair } from "../../src/domain";
import candles from "../mockdata/candles";

describe("Should generate the indicators", () => { 
  it("sma indicator", async () => { 
    const sma = new Indicators().sma({ period : 12 });
    candles.map(sma.generate);
  })

  it("price indicator", async () => { 
    const price = new Indicators().price({ mode : "high" });
    candles.map(price.generate);
  })

  it("rsi indicator", async () => { 
    const rsi = new Indicators().rsi({ period : 12 });
    candles.map(rsi.generate);
  })

  it("atr indicator", async () => { 
    const atr = new Indicators().atr({ period : 12 });
    candles.map(atr.generate);
  })

  it("ema indicator", async () => { 
    const ema = new Indicators().ema({ period : 12 });
    candles.map(ema.generate);
  })

  it("macd indicator", async () => { 
    const macd = new Indicators().macd({ SimpleMAOscillator : true, SimpleMASignal: true, fastPeriod : 12, signalPeriod : 12, slowPeriod : 6 });
    candles.map(macd.generate);
  })
})
