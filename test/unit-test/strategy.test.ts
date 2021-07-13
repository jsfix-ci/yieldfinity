import { fileSync } from "tmp";
import { CustomTriggerParameters, Order, Position, StopLoss, TakeProfit, ExchangePair, Indicators, CustomTriggerFlow, CustomTrigger, Strategy, Candle } from "../../src/";
import { Binance } from "../../src/exchanges"
import fs from "fs";






describe("shoudl test the strategies", () => { 
  it('should find a simple 100% pnl', async () => { 
    const BasicStrategy = ({
      indicators : [price, sma],
      pair
    } : CustomTriggerParameters):Position | false => {
      // We get yesterday's price
      if (price.lastValue === 5) return new Order({
        pair, price : "market", quantity : 1, side:  "long",
        stopLoss : new StopLoss({ reference : "pnl", value: -10}),
        takeProfit : new TakeProfit({ reference : "pnl", value: 100 })
      });
      return false;
    }

    const pair: ExchangePair = "BTCUSDT";
    const binance = new Binance();
    const candles = [
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 5, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
    ];

    const indicators = new Indicators();
    const sma = indicators.sma({ period : 12 });
    const price = indicators.price({ mode: "close" });
    const customTriggerFlow = new CustomTriggerFlow({
      triggers: [
        new CustomTrigger({ parameters: { indicators: [price, sma], pair }, method : BasicStrategy })]
    })
    const strategy = new Strategy({indicators: [price, sma], triggerFlow: customTriggerFlow, exchanges: [binance] });
    strategy.run(candles);
    const profit = strategy.profit;
    const pnl = strategy.pnl;
    expect([pnl, profit]).toStrictEqual([100, 5]);
  })

  it('should find a simple 0% pnl', async () => { 
    let index = 0;
    const BasicStrategy = ({
      indicators : [price, sma],
      pair
    } : CustomTriggerParameters):Position | false => {
      // We get yesterday's price
      if (index === 0 || index === 2) {
        index++;
        return new Order({
          pair, price : "market", quantity : 1, side:  "long",
          stopLoss : new StopLoss({ reference : "pnl", value: -50}),
          takeProfit : new TakeProfit({ reference : "pnl", value: 100 })
        });
      }
      index++;
      return false;
    }

    const pair: ExchangePair = "BTCUSDT";
    const binance = new Binance();
    const candles = [
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 5, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 9, close: 10, high:  10.5, low: 8.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
      new Candle({ openAt: new Date(), closeAt: new Date(), open: 4, close: 5, high: 5.5, low: 3.5, exchange: "binance", volume: 0, interval: "1m", pair: "BTCUSDT"}),
    ];
    // console.log(candles)
    const indicators = new Indicators();

    // Building the indicator
    const sma = indicators.sma({ period : 12 });
    const price = indicators.price({ mode: "close" });

    // We build the trigger flow
    const customTriggerFlow = new CustomTriggerFlow({
      triggers: [
        new CustomTrigger({ parameters: { indicators: [price, sma], pair }, method : BasicStrategy })]
    })

    

    // // Building the stategy & backtestnew Strategy({ indicators: [p
    const strategy = new Strategy({indicators: [price, sma], triggerFlow: customTriggerFlow, exchanges: [binance] });
  
    strategy.run(candles);

    const profit = strategy.profit;
    const pnl = strategy.pnl;
    expect([pnl, profit]).toStrictEqual([0, 0]);
  })
})



