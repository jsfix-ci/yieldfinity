export interface ZipService {
  unzipBuffer(buffer: Buffer, fileToExtract: string): Promise<string>;
}