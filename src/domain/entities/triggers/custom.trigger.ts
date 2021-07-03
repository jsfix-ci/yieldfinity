import { CustomTriggerProps } from "../../port/entities/indicators/triggers/custom.trigger.port";
import { Position } from "../../port/entities/orders/position.port";
import { Indicator } from "../indicator";
import { IndicatorTrigger } from "./indicator-trigger";

export class CustomTrigger {

    public isCustom:boolean = true;
    constructor(private props: CustomTriggerProps) {}

    get method() { return this.props.method }
    get parameters() : any { return this.props.parameters }
    
    public isTriggered():Position {
      try {
        return this.method(this.parameters) || null;
      } catch (err) {
        console.log(err);
        return null;
      }
    }
}