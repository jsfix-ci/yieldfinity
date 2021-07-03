import { CsvParserOptions } from "../../../adapters/services/csv.service";

export interface CsvService {
  parse(filePath: string, options?: CsvParserOptions);
}