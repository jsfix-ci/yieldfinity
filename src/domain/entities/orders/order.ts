import { OrderProps, OrderSide, OrderState } from "../../port/entities/orders/order.port";
import { ExchangePair } from "../../port/repositories/exchange.port";
import { Candle } from "../candle";
import { StopLoss } from "./stop-loss";
import { TakeProfit } from "./take-profit";


export class Order {

  private _startPrice:number;
  private _open: boolean = true;
  private _state:OrderState = { openAt: null, closeAt: null, fee: 0, profit: 0, pnl: 0 };

  constructor(private props: OrderProps) { }

  get side(): OrderSide { return this.props.side }
  get pair(): ExchangePair { return this.props.pair }
  get quantity(): number { return this.props.quantity }
  get price(): number | "market" { return this.props.price }
  get startPrice(): number { return this._startPrice }
  get state(): OrderState { return this._state }
  get opened(): boolean { return this._open }
  get stopLoss() : StopLoss { return this.props.stopLoss }
  get takeProfit() : TakeProfit { return this.props.takeProfit }

  public close = (candle: Candle) => {
    this._open = false;
    this._state.closeAt = new Date(candle.closeAt);
    this._state.fee = 0;
  };
  public open = (candle: Candle) => {
    this._startPrice = candle.close;
    this._state.openAt = new Date(candle.openAt);
  };

  private updateProfitAndLoss(candle: Candle) {
    const side = this.side === "ask" ? 1 : -1;
    const profit = (candle.close - this._startPrice) * side;
    this._state.pnl = profit / this._startPrice * 100;
    this._state.profit = profit  * this.quantity
  }

  public triggerStopLossTakeProfitIfNecessary = (candle: Candle) => {
    if (!this.opened) return;
    this.updateProfitAndLoss(candle);
    const currentPrice =  this.side === "ask" ? candle.high : candle.low;
    if (this.stopLoss.isReached(this, currentPrice))
      this.close(candle);
    if (this.takeProfit.isReached(this, currentPrice))
      this.close(candle);

  }
}