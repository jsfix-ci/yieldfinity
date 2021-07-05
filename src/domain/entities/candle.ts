import { CandleProps } from "../port/entities/candle.port";

export class Candle {
  constructor(private props: CandleProps) {}

  get openAt() : Date { return this.props.openAt };
  get closeAt() : Date { return this.props.closeAt };
  get open() : number { return this.props.open };
  get close() : number { return this.props.close };
  get high() : number { return this.props.high };
  get low() : number { return this.props.low };
  get volume() : number { return this.props.volume };
  get exchange() : string { return this.props.exchange };
  get pair() : string { return this.props.pair };
  get data() { return this.props }
  
}