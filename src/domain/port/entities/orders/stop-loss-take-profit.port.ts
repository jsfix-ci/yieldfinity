import { Order } from "../../../entities/orders/order";
import { ComparerMode } from "../indicators/triggers/indicator-trigger.port";

/**
 * Stop loss / Take profit
 * @param value: The value that will trigger the order
 * @param mode: If "number", will compare in absolute values, if "percentage" will compare in relative value 
 * @param reference: Either use the price as reference or the profit and loss ratio
 * @param amount: The amount of the asset you want to buy / sell (always 100% for now)
 */
export interface StopLossTakeProfitProps {
  value : number;
  reference: "price" | "pnl";
}