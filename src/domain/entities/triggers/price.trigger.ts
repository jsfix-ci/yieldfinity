import { PriceTriggerProps } from "../../port/entities/indicators/triggers/price.trigger.port";
import { IndicatorTrigger } from "./indicator-trigger";

export class PriceTrigger extends IndicatorTrigger {
    constructor(props: PriceTriggerProps) { super(props) }
}