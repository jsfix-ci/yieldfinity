import { RSITriggerProps } from "../../port/entities/indicators/triggers/rsi.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class RSITrigger extends IndicatorTrigger {
    constructor(props: RSITriggerProps) { super(props) }
}