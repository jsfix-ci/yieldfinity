import CsvParse from "csv-parse/lib/sync";
import { Options  } from "csv-parse";
import { CsvService } from "../../domain/port/services/csv.port";
import { FileService } from "../../domain/port/services/file.port";

interface CsvServiceDependencies {
  file : FileService
}

export type CsvParserOptions = Options;

export class Csv implements CsvService {

  constructor(private dependencies : CsvServiceDependencies) {}


  public async parse(content: string, options: CsvParserOptions = {}):Promise<string[][]> {
    return CsvParse(content, options)
  }
  
}