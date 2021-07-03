export interface FileService {
  download(path: string, filename : string, destination: string): Promise<void>;
  delete(filePath: string): Promise<void>;
  read(filePath:string):Promise<string>;
}