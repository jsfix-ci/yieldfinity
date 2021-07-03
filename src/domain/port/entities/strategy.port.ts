import { Candle } from "../../entities/candle";
import { CustomTriggerFlow } from "../../entities/custom-trigger-flow";
import { Indicator } from "../../entities/indicator";
import { TriggerFlow } from "../../entities/trigger-flow";
import { ExchangeRepository } from "../repositories/exchange.port";

export interface StrategyProps {
  indicators: Indicator[];
  triggerFlow : TriggerFlow | CustomTriggerFlow;
  exchanges ?: ExchangeRepository[];
}