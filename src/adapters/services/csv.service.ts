import CsvParse from "csv-parse/lib/sync";
import { Options  } from "csv-parse";
import { CsvService } from "../../domain/port/services/csv.port";

export type CsvParserOptions = Options;

export class Csv implements CsvService {

  constructor() {}


  public async parse(content: string, options: CsvParserOptions = {}):Promise<string[][]> {
    return CsvParse(content, options)
  }
  
}