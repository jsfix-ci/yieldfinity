import { Candle } from "./candle";
import { Indicator, IndicatorsList } from "./indicator";
import { StrategyProps } from "../port/entities/strategy.port";
import { Position } from "../port/entities/orders/position.port";
import { TriggerFlow } from "./trigger-flow";
// import cliProgress from "cli-progress";
import { CustomTriggerFlow } from "./custom-trigger-flow";
import { ExchangeRepository } from "../port/repositories/exchange.port";


export class Strategy {

  private _positions: Position[] = [];
  private _closedPositions: Position[] = [];

  constructor(private props: StrategyProps) { }
  
  get indicator() : Indicator[] { return this.props.indicators };
  
  get triggerFlow() : TriggerFlow | CustomTriggerFlow { return this.props.triggerFlow };
  
  get exchanges() : ExchangeRepository[] { return this.props.exchanges };
  
  get positions() : Position[] { return this._positions };
  
  get closedPositions() : Position[] { return this._closedPositions };

  get profitablePositions() : Position[] { return this._positions.filter(position => position.state.profit >= 0) };

  get lostPositions() : Position[] { return this._positions.filter(position => position.state.profit < 0) };
  
  get profit(): number { return this.closedPositions.reduce((profit, position) => profit + position.state.profit, 0) || 0 }
  
  get pnl(): number { return (this.closedPositions.reduce((pnl, position) => pnl + position.state.pnl, 0) / this.closedPositions.length) || 0 }

  
  get indicators() : IndicatorsList {
    return this.props.indicators.reduce((map:IndicatorsList, indic) => {
      if (!map[indic.name]) map[indic.name] = [indic];
      else map[indic.name].push(indic);
      return map;
    }, {} as IndicatorsList)
  }

  get getPlaygroundPositions() {
    return this.closedPositions.map(position => ({
      side: position.side,
      pair: position.pair,
      quantity: position.quantity,
      price: position.price,
      state: position.state,
    }))
  }

  public run(candles: Candle[]) {
    // const progress = new cliProgress.SingleBar({format: 'Backtesting [{bar}] {percentage}% | {value}/{total}'}, cliProgress.Presets.legacy);
    // progress.start(candles.length, 0);
    candles.map((candle:Candle, i) => {

      // We only keep open positions and store the old ones
      const [openPositions, closedPositions] = this._positions.reduce(([openPositions, closedPositions], position) => {
        position.triggerStopLossTakeProfitIfNecessary(candle);
        position.opened ? openPositions.push(position) : closedPositions.push(position);
        return [openPositions, closedPositions];
      }, [[], []] as [Position[], Position[]]);

      this._positions = openPositions;
      if (closedPositions.length) this._closedPositions = this.closedPositions.concat(closedPositions);

      // We generate the indicators
      this.indicator.map(indicator => indicator.generate(candle));

      // We check if we have positions to open
      const positionsToOpen = this.triggerFlow.getTriggeredPositions();
      positionsToOpen.map(position => position.open(candle));
      this._positions = this._positions.concat(positionsToOpen);
    
      // progress.update(i + 1);
    }, [] as Position[]);
    // progress.stop();
  }
}