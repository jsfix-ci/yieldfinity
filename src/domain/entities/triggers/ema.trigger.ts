import { EMATriggerProps } from "../../port/entities/indicators/triggers/ema.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class EMATrigger extends IndicatorTrigger {
    constructor(props: EMATriggerProps) { super(props) }
}