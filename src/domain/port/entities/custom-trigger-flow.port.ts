import { CustomTrigger } from "../../entities/triggers/custom.trigger";
import { IndicatorTrigger } from "../../entities/triggers/indicator-trigger";
import { Position } from "./orders/position.port";

/**
 * Trigger set
 * @param triggers: An array of custom indicator triggers
 */
export interface CustomTriggerFlowProps {
  triggers : CustomTrigger[];
}

