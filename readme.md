# Strategy backtester
A node strategy backtesting / running framework for crypto trading and more.

⚠️ This project is under active development and is not suitable for production use yet.

# Summary 
- [Getting started](#getting-started)
- [Yieldfinity playground](#yieldfinity-playground)
- [Quickstart](#quickstart)
  - [Indicator trigger based strategies](#indicator-trigger-based-strategies) Premade indicator triggers for fast prototyping
  - [Custom methods based strategies](#custom-methods-based-strategies) Custom strategy triggers for advanced strategy building
- [Candles](#candles) Candle data from exchanges
  - [Model](#model)
- [Indicators](#indicators) Indicators are calculated values based on price an other parameters you can set triggers on
  - [Model](#model-1)
  - [Existing indicators](#existing-indicators)
    - [Price](#price)
    - [SMA](#sma)
    - [EMA](#ema)
    - [RSI](#rsi)
    - [ATR](#atr)
    - [MACD](#macd)
- [Triggers](#triggers) Triggers are comparison functions that will trigger an order if the condition is met (i.e. if the indicator reaches a value you defined)
  - [Custom triggers](#custom-triggers) Build your own trigger functions 
    - [Custom trigger flow](#custom-trigger-flow) Prepare the triggers for the strategy
  - [Indicator triggers](#indicator-triggers) Pre made triggers based on indicators
    - [Basic usage](#basic-usage)
    - [Model](#model-2)
    - [Trigger flow](#trigger-flow) Prepare the triggers for the strategy
    - [Available triggers](#available-triggers)
      - [Price](#price-1)
      - [SMA](#sma-1)
      - [EMA](#ema-1)
      - [RSI](#rsi-1)
      - [ATR](#atr-1)
      - [MACD](#macd-1)
- [Strategies](#strategies) Bundle your indicators, your triggers, and backtest a strategy
  - [Model](#model)
  - [Backtesting](#strategies)
  - [Model](#model)
  - [Visualising your strategies](https://github.com/fabiensabatie/backtester-front)

# Getting started

Yieldfinity is a TS / node strategy backtesting framework, currently under active development. It fetches candle data from binance for any given pair, allows you to create strategies, feed them indicators and triggers, and backtest them. Strategies rely on one or many [indicators](#indicators) and either [indicator triggers](#indicator-triggers) or [custom triggers](#custom-triggers) to work. Indicators provide the computed candle data, and the indicator triggers are function checking if they should trigger an order or not.

# Yieldfinity playground

Checkout the [yieldfinity playground](https://github.com/fabiensabatie/yieldfinity-playground) : it allows you to code and visualize your strategies directly in your web browser.

![Backtester](https://raw.githubusercontent.com/fabiensabatie/backtester-front/main/public/images/backtester.png)


# Quickstart
## Custom methods based strategies

This method uses a custom function which triggers either a `buy` or a `sell` order. Let's make a ridiculously stupid strategy : if the price is even, we buy, else we sell.

```ts
import { Strategy, ExchangePair, Binance, Candle } from "yieldfinity";
import { Indicators } from "yieldfinity/indicators";
import { Position, Order, StopLoss, TakeProfit } from "yieldfinity/orders";
import { CustomTriggerFlow } from "yieldfinity/flows";
import { CustomTrigger } from "yieldfinity/triggers";

const pair: ExchangePair = "BTCUSDT";
const sDate = new Date("2021-01-07");
const eDate = new Date("2021-03-28");
const binance = new Binance();

binance.getCandles(sDate, eDate, pair, "1m")
.then((candles: Candle[]) => {
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
  strategy.savePositions();

  const profit = strategy.profit;
  const pnl = strategy.pnl;
  const profitablePositions = Math.ceil(strategy.profitablePositions.length / strategy.positions.length * 100);
  console.log(`Strategy made a profit of ${profit} (${pnl}%) : ${profitablePositions}% of positions were profitable`);
});

```


## Indicator trigger based strategies

An indicator trigger is a function that will be executed automatically at each candle. It takes standardized parameters for quick prototyping.

```ts
// Imports
import { Strategy, ExchangePair, Binance, Candle } from "yieldfinity";
import { Indicators } from "yieldfinity/indicators";
import { Position, Order, StopLoss, TakeProfit } from "yieldfinity/orders";
import { TriggerFlow } from "yieldfinity/flows";
import { PriceTrigger, SMATrigger } from "yieldfinity/triggers";

const pair: ExchangePair = "BTCUSDT";
const sDate = new Date("2021-01-01");
const eDate = new Date("2021-01-30");
const binance = new Binance();

binance.getCandles(sDate, eDate, pair, "1m")
.then((candles: Candle[]) => {
  const indicators = new Indicators();

  // Building the indicator
  const sma = indicators.sma({ period : 12 });
  const price = indicators.price({ mode: "high" });

  // Building the triggers
  const triggers = [
    new SMATrigger({ indicator: sma, field: "value", triggerValue : 2, comparer: ">=", mode: "percentage", tMinus: 60*24 }),
    new PriceTrigger({ indicator: price, field: "value", triggerValue : 10, comparer: ">=", mode: "percentage", tMinus:  60 * 12 }),
  ];

  const triggerFlow = new TriggerFlow({
    flow : [{
      triggers,
      operator : "and",
      position: new Order({
        pair,
        price : "market",
        quantity : 1,
        side: "ask",
        stopLoss : new StopLoss({ reference : "pnl",  value: -5 }),
        takeProfit : new TakeProfit({ reference : "pnl",  value: 10 })
      })
    }]
  });

  // Building the stategy & backtest
  const strategy = new Strategy({ indicators: [price, sma], triggerFlow, exchanges: [binance] });
  strategy.run(candles);

  // Save your positions before being able to read them
  strategy.savePositions(candles);

  console.log(`${strategy.closedPositions.filter(pos => pos.state.profit > 0).length}/${strategy.closedPositions.length} profitable positions`)
});


```

# Candles

### Model

```ts
interface Candle {
  openAt: Date;
  closeAt: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  exchange: string;
  pair: ExchangePair;
  interval: ExchangeInterval;
}
```

You can fetch the candles from Binance as such :
```ts
import { ExchangePair, Binance } from "yieldfinity";

const pair: ExchangePair  =  "BTCUSDT";
const sDate = new Date("2021-01-01");
const eDate = new Date("2021-04-30");
const candles = await new Binance().getCandles(sDate, eDate, pair, "1m"); // Must be 1m for now
```
 

# Indicators

## Model
```ts
interface Indicator {
  method(): Function;
  name(): string;
  values():IndicatorOutput[];
  parameters(): IndicatorParameters;
  lastValue() : IndicatorOutput;
  lastIndex() : number;
}
```

Your indicators can be anything, from a regular technical indicator to an external datasource. They simply are generator functions returning a value for each candle being fed to it.

Import the indicators as such :
```ts
import { Indicators } from "yieldfinity";
// or
import { Indicators } from "yieldfinity/indicators";

const indicators = new Indicators();
```

## Existing indicators 

#### Price
```ts
const price = indicators.price({
  mode: "high" // "high" | "low" | "close" | "open";
});

price.generate(candle);
console.log(price.lastValue) // 152400.2
```


#### SMA
```ts
const sma = indicators.sma({
  period : 12 // number;
});

sma.generate(candle);
console.log(sma.lastValue) // 254.2
```

#### EMA
```ts
const ema = indicators.ema({
  period : 12 // number;
});

ema.generate(candle);
console.log(ema.lastValue) // 124.5
```

#### RSI
```ts
const rsi = indicators.rsi({
  period : 12 // number;
});

rsi.generate(candle);
console.log(rsi.lastValue) // 748.5
```

#### ATR
```ts
const atr = indicators.atr({
  period : 12 // number;
});

atr.generate(candle);
console.log(atr.lastValue) // 748.5
```

#### MACD
```ts
const macd = indicators.macd({
  SimpleMAOscillator: true, // boolean
  SimpleMASignal: true, // boolean
  fastPeriod: 12, // number
  slowPeriod: 24, // number
  signalPeriod: 12 // number
});

macd.generate(candle);
console.log(macd.lastValue)
/*
{
  MACD: 20, // number
  histogram: 50, // number
  signal: 10, // number
}
*/
```

# Triggers

## Custom triggers

You can create your own triggering method (useful if you want to create signals, code and debug your own strategy, or if you wish to have more control over what your backtesting process) .

A custom trigger method must have the following prototype :

```ts
type CustomTriggerMethod = (parameters : any) => Position | null;
```

### Custom Trigger flow

After creating your custom trigger, you must then insert it into a `CustomTriggerFlow`, and pass it to a strategy as such :

```ts
import { CustomTriggerFlow } from "yieldfinity";
// or
import { CustomTriggerFlow } from "yieldfinity/flows";

// Build a custom strategy flow
const customTriggerFlow = new CustomTriggerFlow({
  triggers: [
    new CustomTrigger({
      parameters: [price], // Indicator[]
      method : ([price]) => {
        // Define your own method here, return a position or null;
        return null;
      }
    })
  ]
})

// Building the stategy & backtest
const strategy = new Strategy({ indicators: [price, sma], triggerFlow: customTriggerFlow });
strategy.run(candles);
```



## Indicator triggers

### Basic usage 

You can create strategies using triggers. Once your indicator has been generated, the trigger will compare the value of the indicator with the parameters you fed to the trigger. For each trigger, the `field` corresponds to either of the indicator output. For instance, values available for the `MACDTrigger` are `MACD` or `histogram` or `signal`.

#### Model


```ts
/**
 * Indicator trigger
 
 * @param field: the name of the output of an indicator you can set a trigger on
 
 * @param triggerField: ❌ Not available yet
 Optionnal, only for multiple output indicators. For instance, allows you to compare the MACD
 signal against the histogram to check if the lines are crossing. If specified, tMinus will
 be ignored and only market values will be compared.
 
 * @param triggerValue :
 If tMinus = 0, the market value of the indicator and the
 triggerValue are compared, else it will take the value of the indicator at t - tMinus
 and compare it using the triggerValue
 
 * @param tMinus : in minutes

 * @param comparer : basic TS comparison operators ("<" or ">" or "<=" or "=>" or "=" )

 * @param mode :
 If "percentage", will check the evolution of the indicator in % (tMinus must be > 0).
 If "relative", the triggerValue will be added to the indicator's value.
 If "absolute", the triggerValue will directly be compared to the indicator's value.

**/
interface IndicatorTrigger {
  indicator: Indicator;
  field: string; // See each available trigger example below for usage
  triggerField ?: string;
  triggerValue : number;
  tMinus ?: number;
  comparer : Comparer;
  mode : ComparerMode;
}
```

### Trigger flow

After creating your trigger, you must then insert it into a `TriggerFlow`, and pass it to a strategy as such :

```ts
import { SMATrigger, PriceTrigger } from "yieldfinity/triggers";
import { TriggerFlow } from "yieldfinity/flows";
// or
import { SMATrigger, PriceTrigger, TriggerFlow } from "yieldfinity/flows";

// Building the triggers
const triggers = [
  new SMATrigger({ indicator: sma, field: "value", triggerValue : 2, comparer: ">=", mode: "percentage", tMinus: 60*24 }),
  new PriceTrigger({ indicator: price, field: "value", triggerValue : 10, comparer: ">=", mode: "percentage", tMinus:  60 * 12 }),
];

const triggerFlow = new TriggerFlow({
  flow : [{ triggers : triggers, operator : "and", position: askOrder }]
});

// Building the stategy & backtest
const strategy = new Strategy({ indicators: [price, sma], triggerFlow: customTriggerFlow });
strategy.run(candles);
```

### Available triggers

You can set a trigger for each indicator already available :

#### Price
```ts
const price = indicators.price({ mode: "high" });
const priceTrigger = new  PriceTrigger({ indicator: price, field: "value", triggerValue : 10, comparer: ">=", mode: "percentage", tMinus: 60  *  12 })
// Check if price raised by 10% over the last 12 hours
```
*
#### SMA
```ts
const sma = indicators.sma({ period: 12 });
const emaTrigger = new  SMATrigger({ indicator: price, field: "value", triggerValue : 100, comparer: "<", mode: "absolute", tMinus: 0 })
// Check if SMA is marketly < 100
```

#### EMA
```ts
const ema = indicators.ema({ period: 12 });
const emaTrigger = new  EMATrigger({ indicator: price, field: "value", triggerValue : 200, comparer: ">=", mode: "relative", tMinus: 60 * 24 })
// Check if EMA as gained 200 points over the last 24 hours
```

#### RSI
```ts
const rsi = indicators.rsi({ period: 12 });
const rsiTrigger = new  RSITrigger({ indicator: price, field: "value", triggerValue : 200, comparer: ">=", mode: "relative", tMinus: 60 * 24 })
// Check if RSI as gained 200 points over the last 24 hours
```

#### ATR
```ts
const ATR = indicators.ATR({ period: 12 });
const ATRTrigger = new  ATRTrigger({ indicator: price, field: "value", triggerValue : 200, comparer: ">=", mode: "relative", tMinus: 60 * 24 })
// Check if ATR as gained 200 points over the last 24 hours
```

#### MACD
```ts
const macd = indicators.macd({
  SimpleMAOscillator: true, // boolean
  SimpleMASignal: true, // boolean
  fastPeriod: 12, // number
  slowPeriod: 24, // number
  signalPeriod: 12 // number
});
const macdTrigger = new  MACDTrigger({
  indicator: macd,
  field: "histogram", // can be either "MACD" | "histogram" | "signal"
  triggerValue : 2,
  comparer: ">=", mode:
  "percentage",
  tMinus: 5
})
// Check if MACD histogram as gained 2% over the last 5 minutes
```

### Strategies

Strategies handle the [indicators](#indicators) and the [triggers](#triggers) for you, and are defined as such :

#### Model

```ts
interface Strategy {
  indicators: Indicator[];
  triggerFlow : TriggerFlow | CustomTriggerFlow;
}
```

#### Backtest

You can feed your [indicators](#indicators), [trigger flow](#trigger-flow) or [custom trigger flow](#custom-trigger-flow) and new candles to your strategy and start backtesting like this :

```ts
import { Strategy } from "yieldfinity";

// Building the stategy & backtest
const strategy = new Strategy({ indicators: [price, sma], triggerFlow: customTriggerFlow });

strategy.run(candles);
```

