import { ExchangePair } from "../../repositories/exchange.port";
import { StopLoss } from "../../../entities/orders/stop-loss";
import { TakeProfit } from "../../../entities/orders/take-profit";

export type OrderSide = "long" | "short";

export interface OrderState {
  openAt: Date | null;
  closeAt: Date | null;
  fee: number;
  profit: number;
  pnl: number;
}

export interface OrderProps {
  side: OrderSide;
  pair: ExchangePair;
  quantity: number;
  price: number | "market";
  stopLoss : StopLoss;
  takeProfit : TakeProfit;
}