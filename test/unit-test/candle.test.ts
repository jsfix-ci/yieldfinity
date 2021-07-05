import { Binance } from "../../src/exchanges"

describe("Fetch binance data", () => { 
  it('should fetch candles', async () => { 
    const candles = await new Binance().getCandles(new Date("2021-01-01"), new Date("2021-01-07"), "BTCUSDT", "1m");
    expect(candles.length).toBeGreaterThan(0)
  })
})
