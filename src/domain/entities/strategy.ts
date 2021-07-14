import { Candle } from "./candle";
import { Indicator, IndicatorsList } from "./indicator";
import { StrategyProps } from "../port/entities/strategy.port";
import { Position } from "../port/entities/orders/position.port";
import { TriggerFlow } from "./trigger-flow";
import { CustomTriggerFlow } from "./custom-trigger-flow";
import { ExchangeRepository } from "../port/repositories/exchange.port";


export class Strategy {

  private _openPositions: Position[] = [];
  private _closedPositions: Position[] = [];
  private _capitalInvested: number = 0;

  constructor(private props: StrategyProps) { }
  
  get indicator() : Indicator[] { return this.props.indicators };
  
  get triggerFlow() : TriggerFlow | CustomTriggerFlow { return this.props.triggerFlow };
  
  get exchanges() : ExchangeRepository[] { return this.props.exchanges };
  
  get positions() : Position[] { return this._openPositions };

  get capitalInvested() : number { return this._capitalInvested };
  
  get closedPositions() : Position[] { return this._closedPositions };

  get profitablePositions() : Position[] { return this._closedPositions.filter(position => position.state.profit >= 0) };

  get lostPositions() : Position[] { return this._closedPositions.filter(position => position.state.profit < 0) };
  
  get profit(): number { return this._closedPositions.reduce((profit, position) => profit + position.state.profit, 0) || 0 }
  
  get pnl(): number { return (this._closedPositions.reduce((pnl, position) => pnl + position.state.profit, 0) / this._capitalInvested * 100) || 0 }

  
  get indicators() : IndicatorsList {
    return this.props.indicators.reduce((map:IndicatorsList, indic) => {
      if (!map[indic.name]) map[indic.name] = [indic];
      else map[indic.name].push(indic);
      return map;
    }, {} as IndicatorsList)
  }

  public updateCapitalInvested(positions: Position[]) {
    positions.map(position => { this._capitalInvested += position.startPrice * position.quantity; })
  }

  public run(candles: Candle[]) {
    candles.map((candle:Candle, i) => {
      // We only keep open positions and store the old ones
      const [openPositions, closedPositions] = this._openPositions.reduce(([openPositions, closedPositions], position) => {
        position.triggerStopLossTakeProfitIfNecessary(candle);
        position.opened ? openPositions.push(position) : closedPositions.push(position);
        return [openPositions, closedPositions];
      }, [[], []] as [Position[], Position[]]);

      if (closedPositions.length) this._closedPositions = [...this._closedPositions, ...closedPositions];
      
      this._openPositions = openPositions;
      // We generate the indicators
      this.indicator.map(indicator => indicator.generate(candle));

      // We check if we have positions to open
      const positionsToOpen = this.triggerFlow.getTriggeredPositions();
      positionsToOpen.map(position => position.open(candle));
      this.updateCapitalInvested(positionsToOpen);
      this._openPositions = this._openPositions.concat(positionsToOpen);
    }, [] as Position[]);
  }
}