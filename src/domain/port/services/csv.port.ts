import { CsvParserOptions } from "../../../adapters/services/csv.service";

export interface CsvService {
  parse(content: string, options?: CsvParserOptions);
}