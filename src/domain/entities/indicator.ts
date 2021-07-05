
import { IndicatorInput, IndicatorMethod, IndicatorOutput, IndicatorParameters, IndicatorProps, IndicatorsName } from "../port/entities/indicator.port";
import { Candle } from "./candle";

export type IndicatorsList = { [key in IndicatorsName] : Indicator[] }

export class Indicator {

  private generated:IndicatorOutput[] = [];
  constructor(private props: IndicatorProps) {
    this.method.bind(this);
  }

  public get method(): Function { return this.props.method; }
  public get name(): string { return this.props.name; }
  public get values():IndicatorOutput[] { return this.generated; }
  public get parameters(): IndicatorParameters  { return this.props.parameters; }
  public get lastValue() : IndicatorOutput { return this.generated[this.generated.length - 1]; }
  public get lastIndex() : number { return this.generated.length - 1; }


  public generate(candle: Candle) {
    const nextValue = this.method(this.parameters, candle, this.values, this.lastValue, this.lastIndex) ?? null;
    this.generated.push(nextValue);
    return nextValue;
  }
}
