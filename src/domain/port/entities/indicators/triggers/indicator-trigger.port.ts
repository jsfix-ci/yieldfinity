import { Indicator } from "../../../../entities/indicator";


export type Comparer = "<" | ">" | "<=" | ">=" | "=";
export type ComparerMode = "relative" | "absolute" | "percentage";

export interface IndicatorTriggerProps {
  indicator: Indicator;
  field: string;
  triggerField ?: string;
  triggerValue : number;
  tMinus ?: number;
  comparer : Comparer;
  mode : ComparerMode;
}
