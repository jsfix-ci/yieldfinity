import { IndicatorTriggerProps } from "./indicator-trigger.port";

export interface PriceTriggerProps extends IndicatorTriggerProps {
    field: "value";
}