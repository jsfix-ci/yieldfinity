import { Candle } from "../../domain/entities/candle";
import { CandleProps } from "../../domain/port/entities/candle.port";
import { ExchangePair } from "../../domain/port/repositories/exchange.port";


const CandleMapper = {
  toDomain(candle: CandleProps) : Candle {
    return new Candle(candle)
  },
  exchanges: {
    binance : {
      toDomain(candleData: string[], pair: ExchangePair) : Candle {
        return new Candle({
          openAt : new Date(+candleData[0]),
          open : +candleData[1],
          high : +candleData[2],
          low : +candleData[3],
          close : +candleData[4],
          volume : +candleData[5],
          closeAt : new Date(+candleData[6]),
          exchange : "binance",
          pair,
          interval : "1m"
        })
      }
    },
    bitvavo : {
      toDomain(candleData: Array<string | number>, pair: ExchangePair) : Candle {
        return new Candle({
          openAt : new Date(+candleData[0]),
          open : +candleData[1],
          high : +candleData[2],
          low : +candleData[3],
          close : +candleData[4],
          volume : +candleData[5],
          closeAt : new Date(+candleData[6]),
          exchange : "binance",
          pair,
          interval : "1m"
        })
      }
    }
  }
}

export default  CandleMapper;