export interface ZipService {
  unzip(path: string, filename: string, destination: string): Promise<void>;
}