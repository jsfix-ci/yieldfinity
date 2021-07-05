import { Strategy, ExchangePair, Binance, Candle } from "../../src";
import { Indicators } from "../../src/indicators";
import { Position, Order, StopLoss, TakeProfit } from "../../src/orders";
import { CustomTriggerFlow } from "../../src/flows";
import { CustomTrigger } from "../../src/triggers";

const pair: ExchangePair = "BTCUSDT";
const sDate = new Date("2021-01-07");
const eDate = new Date("2021-03-28");
const binance = new Binance();


describe("Run strategy", () => { 
  it("should run strategy", async () => { 
    const candles = await binance.getCandles(sDate, eDate, pair, "1m")
    const indicators = new Indicators();
  
    // Building the indicator
    const sma = indicators.sma({ period : 12 });
    const price = indicators.price({ mode: "high" });
  
    // We build the trigger flow
    const customTriggerFlow = new CustomTriggerFlow({
      triggers: [
        new CustomTrigger({
          parameters: {
            indicators: [price, sma],
            pair
          },
          // If the price is odd then we place buy order
          method : ({indicators}) => {
            const [price, sma] = indicators;
            return (price.lastValue % 2) ? new Order({
              pair,
              price : "market",
              quantity : 0.01,
              side: "ask",
              stopLoss : new StopLoss({ reference : "pnl",  value: -5 }),
              takeProfit : new TakeProfit({ reference : "pnl",  value: 10 })
            }) : null;
          }
        })
      ]
    })
  
    // Building the stategy & backtest
    const strategy = new Strategy({ indicators: [price, sma], triggerFlow: customTriggerFlow, exchanges: [binance] });
  
    strategy.run(candles);
  
    // Save your positions before being able to read them
    const profit = strategy.profit;
    const pnl = strategy.pnl;
    const profitablePositions = Math.ceil(strategy.profitablePositions.length / strategy.positions.length * 100);
    console.log(`Strategy made a profit of ${profit} (${pnl}%) : ${profitablePositions}% of positions were profitable`);

  })
})
