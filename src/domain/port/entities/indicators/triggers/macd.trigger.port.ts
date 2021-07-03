import { IndicatorTriggerProps } from "./indicator-trigger.port";

export interface MACDTriggerProps extends IndicatorTriggerProps {
    field: "MACD" | "signal" | "histogram";

}