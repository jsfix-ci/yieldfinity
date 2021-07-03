import { CustomTrigger } from "../../entities/triggers/custom.trigger";
import { IndicatorTrigger } from "../../entities/triggers/indicator-trigger";
import { Position } from "./orders/position.port";

/**
 * Trigger set
 * @param triggers: An array of indicator triggers
 * @param operator: If "and", all triggers must be set off for the corresponding order to be executed. If "or", any trigger within the set will execute the order
 */
 export interface TriggerSet {
  triggers : IndicatorTrigger[];
  operator : "and" | "or";
  position: Position;
}

export interface TriggerFlowProps {
  flow: TriggerSet[];
}

