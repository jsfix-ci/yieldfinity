export interface FileService {
  downloadAsBuffer(path: string): Promise<Buffer>;
}