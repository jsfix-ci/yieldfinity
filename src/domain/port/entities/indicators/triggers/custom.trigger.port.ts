import { Indicator } from "../../../../entities/indicator";
import { Position } from "../../orders/position.port";
import { IndicatorTriggerProps } from "./indicator-trigger.port";

export interface CustomTriggerParameters {
  [key:string] : any
}

export interface CustomTriggerProps {
  parameters : CustomTriggerParameters;
  method: (parameters: CustomTriggerParameters) => Position | null | undefined | false;
}