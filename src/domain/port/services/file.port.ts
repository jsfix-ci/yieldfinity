export interface FileService {
  download(path: string, filename : string, destination: string): Promise<void>;
  delete(filePath: string): Promise<void>;
  read(filePath:string): string;
  write(filePath:string, data:string): void;
  appendFile(filePath:string, data:string): void;
  temporaryFile(extension: string): string;
  temporaryFolder(): string;
}