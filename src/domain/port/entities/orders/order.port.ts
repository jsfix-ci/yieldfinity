import { ExchangePair } from "../../repositories/exchange.port";
import { StopLoss } from "../../../entities/orders/stop-loss";
import { TakeProfit } from "../../../entities/orders/take-profit";

export type OrderSide = "ask" | "bid";

export interface OrderState {
  openAt: Date | null;
  closeAt: Date | null;
  fee: number | null;
  profit: number | null;
  pnl: number | null;
}

export interface OrderParameters {
  side: OrderSide;
  pair: ExchangePair;
  quantity: number;
  price: number | "market";
  stopLoss : StopLoss;
  takeProfit : TakeProfit;
}