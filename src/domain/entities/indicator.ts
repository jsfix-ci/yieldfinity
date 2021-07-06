
import { IndicatorInput, IndicatorMethod, IndicatorOutput, IndicatorParameters, IndicatorProps, IndicatorsName } from "../port/entities/indicator.port";
import { Candle } from "./candle";

export type IndicatorsList = { [key in IndicatorsName] : Indicator[] }

export class Indicator {

  private generated:IndicatorOutput[] = [];
  constructor(private props: IndicatorProps) {}

  public get method(): Generator<IndicatorOutput> { return this.props.method; }
  public get name(): string { return this.props.name; }
  public get values():IndicatorOutput[] { return this.generated; }
  public get parameters(): IndicatorParameters  { return this.props.parameters; }
  public get lastValue() : IndicatorOutput { return this.generated[this.generated.length - 1]; }
  public get lastIndex() : number { return this.generated.length - 1; }


  public generate = (candle: Candle) => {
    const nextValue = this.method.next(candle.close).value;
    this.generated.push(nextValue || null);
    return nextValue;
  }
}
