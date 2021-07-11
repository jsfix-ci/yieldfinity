import { ComparerMode } from "../../port/entities/indicators/triggers/indicator-trigger.port";
import { OrderState } from "../../port/entities/orders/order.port";
import { StopLossTakeProfitProps } from "../../port/entities/orders/stop-loss-take-profit.port";
import { Order } from "./order";

export class TakeProfit {
  constructor(private props : StopLossTakeProfitProps) {}
  
  get value()  : number { return this.props.value };
  get reference() : "price" | "pnl" { return this.props.reference };

  isReached = (order: Order, currentPrice: number) => {
    return order.side === "long" ?
      this.reference === "price" ? currentPrice >= this.value : order.state.pnl >= this.value
    : this.reference === "price" ? currentPrice <= this.value : order.state.pnl >= this.value;
  }
}