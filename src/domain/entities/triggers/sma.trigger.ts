import { SMATriggerProps } from "../../port/entities/indicators/triggers/sma.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class SMATrigger extends IndicatorTrigger {
    constructor(props: SMATriggerProps) { super(props) }
}