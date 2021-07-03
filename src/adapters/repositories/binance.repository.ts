import axios, { AxiosAdapter } from "axios";
import { Candle } from "../../domain/entities/candle";
import { ExchangeRepository, ExchangeInterval, ExchangePair, BinanceCredentials } from "../../domain/port/repositories/exchange.port"
import { CsvService } from "../../domain/port/services/csv.port";
import { FileService } from "../../domain/port/services/file.port";
import { ZipService } from "../../domain/port/services/zip.port";
import CandleMapper from "../mappers/candle.mapper";
import { Csv } from "../services/csv.service";
import { File } from "../services/file.service";
import { Zip } from "../services/zip.service";
import tmp from "tmp";

interface BinanceExchangeDependencies {
  zip : ZipService,
  file : FileService,
  csv : CsvService
}

interface CandleZipFile {
  url : string;
  name : string;
  path : string;
  folder : string;
}

const file = new File(), csv = new Csv({ file }), zip = new Zip();
const binanceDependencies = { zip, csv, file };

export class Binance implements ExchangeRepository {
  private _url = "https://data.binance.vision/data/spot/monthly/klines";
  private _auth: boolean = false;

  constructor(private dependencies ?: BinanceExchangeDependencies) {
    if (!dependencies) this.dependencies = binanceDependencies;
  }

  public async auth(credentials: BinanceCredentials) {
    this._auth = true;
  }

  private buildCandleFileData(date: Date, pair: ExchangePair, interval: ExchangeInterval):CandleZipFile {
    const year = date.getFullYear(),  month = ("0" + (date.getMonth() + 1)).slice(-2), name = `${pair}-${interval}-${year}-${month}`;
    const stamp = Math.ceil(Date.now() + Math.random() * 10000);
    const tmpFolder = tmp.dirSync();
    return ({
      url: `${this._url}/${pair}/${interval}/${name}.zip`,
      name : `${name}-${stamp}`,
      path: `${tmpFolder.name}/${name}-${stamp}.zip`,
      folder: tmpFolder.name
    })
  }

  private async fetchCandles(sDate: Date, pair: ExchangePair, interval: ExchangeInterval):Promise<Candle[]> {
    const zipFile = this.buildCandleFileData(sDate, pair, interval);
    await this.dependencies.file.download(zipFile.url, zipFile.name + '.zip', zipFile.folder);
    await this.dependencies.zip.unzip(zipFile.path, zipFile.name + '.csv', zipFile.folder);
    const candles = await this.dependencies.csv.parse(`${zipFile.folder}/${zipFile.name}.csv`, { columns: false, skip_empty_lines: true });
    await this.dependencies.file.delete(`${zipFile.folder}/${zipFile.name}.csv`);
    await this.dependencies.file.delete(zipFile.path);
    return candles.map((c:string[]) => CandleMapper.exchanges.binance.toDomain(c, pair));
   }

  public async getCandles(sDate: Date, eDate: Date, pair: ExchangePair, interval: ExchangeInterval):Promise<Candle[]> {
   const monthDifference =  eDate.getMonth() - sDate.getMonth() +  (12 * (eDate.getFullYear() - sDate.getFullYear()));
   const promises = [], parsingDate = new Date(sDate);
   for (let month = 0; month <= monthDifference; month++) {
    promises.push(this.fetchCandles(parsingDate, pair, interval))
    parsingDate.setMonth(parsingDate.getMonth() + 1);
   }
   const candles = await Promise.all(promises);
   return candles.flat().filter(candle => candle.openAt >= sDate && candle.closeAt <= eDate);
  }
}
