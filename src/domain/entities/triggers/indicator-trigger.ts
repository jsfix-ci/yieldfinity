import { Comparer, ComparerMode, IndicatorTriggerProps } from "../../port/entities/indicators/triggers/indicator-trigger.port";
import { Position } from "../../port/entities/orders/position.port";
import { Indicator } from "../indicator";

/**
 * Indicator trigger
 * @param field: the name of the output of an indicator you can set a trigger on
 * @param triggerField: Optionnal, only for multiple output indicators.
 * For instance, allows you to compare the MACD signal against the histogram to check if the lines are crossing.
 * If specified, tMinus will be ignored and only current values will be compared.
 * @param triggerValue : if tMinus = 0, the current value of the indicator and the triggerValue are compared,
 * else it will take the value of the indicator at t - tMinus and compare it using the triggerValue
 * @param tMinus : in minutes
 * @param comparer : basic TS comparison operators ("<" or ">" or "<=" or "=>" or "=" )
 * @param mode : relative comparison (percentage) or absolute comparison (number)
 */
export class IndicatorTrigger {

  isCustom = false;

  constructor(private props: IndicatorTriggerProps) {
    if (!this.tMinus && this.mode === "percentage")
      throw new Error("You must provide a positive tMinus with the percentage mode (can't compare a value to a percentage of itself)")
    if (this.tMinus && this.mode === "absolute") 
      throw new Error("tMinus must be 0 when using the absolute mode")
  }

  get triggerField() : string { return this.props.triggerField };
  get triggerValue() : number { return this.props.triggerValue };
  get field() : string { return this.props.field };
  get tMinus() : number { return Math.abs(Math.round(this.props.tMinus)) };
  get comparer() : Comparer { return this.props.comparer };
  get mode() : ComparerMode { return this.props.mode };
  get indicator() : Indicator { return this.props.indicator }

  private getComparedValue():number {
    const lastIndex = this.indicator.values.length - 1;
    let indicatorValue = this.tMinus ? this.indicator.values[lastIndex - this.tMinus] : this.indicator.lastValue;
    if (!indicatorValue && indicatorValue != 0) return null;
    if (this.field !== "value") indicatorValue = indicatorValue[this.field];
    const comparedValue:number = this.field === "value" ? indicatorValue : indicatorValue[this.field];
    if (this.mode === "percentage") return comparedValue + (comparedValue * this.triggerValue / 100);
    else if (this.mode === "absolute") return this.triggerValue;
    else if (this.mode === "relative") return  (this.field === "value" ? indicatorValue as number : indicatorValue[this.field])  + this.triggerValue;
    else return null;
  }

  private getCurrentValue():number {
    let indicatorValue = this.indicator.lastValue;
    if (!indicatorValue && indicatorValue != 0) return null;
    return this.field === "value" ? indicatorValue : indicatorValue[this.field];
  }

  private compareValues(currentValue: number, comparedValue: number) {
    if (this.comparer === ">") return currentValue > comparedValue;
    else if (this.comparer === ">=") return currentValue >= comparedValue;
    else if (this.comparer === "<") return currentValue < comparedValue;
    else if (this.comparer === "<=") return currentValue <= comparedValue;
    else if (this.comparer === "=") return currentValue === comparedValue;
    return false;
  }

  public isTriggered(): boolean | Position {
    const comparedValue = this.getComparedValue();
    const currentValue = this.getCurrentValue();
    if (!comparedValue  || !currentValue) return false;
    return this.compareValues(currentValue, comparedValue)
  }
}

// If mode is number
  // If tMinus
    // currentValue = 
    // comparedValue = 
  // If triggerField
    // currentValue = 
    // comparedValue =
    
// If mode is relative
  // If tMinus
    // currentValue = 
    // comparedValue = 
  // If triggerField
    // currentValue = 
    // comparedValue = 

// If mode is absolute
  // If tMinus
    // currentValue = 
    // comparedValue = 
  // If triggerField
    // currentValue = 
    // comparedValue = 