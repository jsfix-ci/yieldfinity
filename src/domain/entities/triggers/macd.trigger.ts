import { MACDTriggerProps } from "../../port/entities/indicators/triggers/macd.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class MACDTrigger extends IndicatorTrigger {
    constructor(props: MACDTriggerProps) { super(props) }
}