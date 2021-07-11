import { fileSync } from "tmp";
import { CustomTriggerParameters, Order, Position, StopLoss, TakeProfit, ExchangePair, Indicators, CustomTriggerFlow, CustomTrigger, Strategy } from "../../src/";
import { Binance } from "../../src/exchanges"
import fs from "fs";

const BasicStrategy = ({
  indicators : [price, sma],
  pair
} : CustomTriggerParameters):Position | false => {
  // We get yesterday's price
  const yesterdayPrice = price.values[price.lastIndex - 24 * 60] as number;
  
  if ((price.lastValue >=  10 * yesterdayPrice / 100 + yesterdayPrice) && (Math.ceil(price.lastValue) % 10 === 0))  
    return new Order({
      pair, price : "market", quantity : 0.001, side:  "ask",
      stopLoss : new StopLoss({ reference : "pnl", value: -10 }),
  
      takeProfit : new TakeProfit({ reference : "pnl", value: 20 })
    });
  return false;
}


const backtest = async () => {
  try {
    console.log("#####################################");
    
  }
  catch (err) {
    console.log(err)
  }
}




describe("Fetch binance data", () => { 
  it('should fetch candles', async () => { 
    const pair: ExchangePair = "BTCUSDT";
    const sDate = new Date("2021-01-07");
    const eDate = new Date("2021-01-28");
    const binance = new Binance();
    const candles = await binance.getCandles(sDate, eDate, pair, "1m");
    // console.log(candles)
    const indicators = new Indicators();

    // Building the indicator
    const sma = indicators.sma({ period : 12 });
    const price = indicators.price({ mode: "high" });

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
    const profitablePositions = Math.ceil(strategy.profitablePositions.length / strategy.positions.length * 100);
    fs.writeFileSync("./data.json", JSON.stringify(strategy.getPlaygroundPositions))
    console.log(`Strategy made a profit of ${profit} (${pnl}%) : ${profitablePositions}% of positions were profitable`);
    expect(true).toBe(true)
  })
})



