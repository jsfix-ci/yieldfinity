import { ExchangeInterval, ExchangePair } from "../repositories/exchange.port";

export interface CandleIntervalProps {
  id ?: number;
  startDate : Date;
  endDate : Date;
  exchange : string;
  pair : ExchangePair;
  interval : ExchangeInterval;
}
