
import { IndicatorInput, IndicatorMethod, IndicatorOutput, IndicatorParameters, IndicatorProps, IndicatorsName } from "../port/entities/indicator.port";
import { Candle } from "./candle";

export type IndicatorsList = { [key in IndicatorsName] : Indicator[] }

export class Indicator {

  private _generated:IndicatorOutput[] = [];
  constructor(private props: IndicatorProps) {}

  public get method(): IndicatorMethod { return this.props.method; }
  public get name(): string { return this.props.name; }
  public get values():IndicatorOutput[] { return this._generated; }
  public get parameters(): IndicatorParameters  { return this.props.parameters; }
  public get lastValue() : IndicatorOutput { return this._generated[this._generated.length - 1]; }
  public get lastIndex() : number { return this._generated.length; }


  public generate = (candle: Candle) => {
    const nextValue = this.method({
      candle,
      lastValue: this.lastValue,
      lastIndex: this.lastIndex,
      values: this.values
    });
    this._generated.push(nextValue || null);
    return nextValue;
  }
}
