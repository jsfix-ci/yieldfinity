import { ATRTriggerProps } from "../../port/entities/indicators/triggers/atr.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class ATRTrigger extends IndicatorTrigger {
    constructor(props: ATRTriggerProps) { super(props) }
}