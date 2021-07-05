import { ZipService } from "../../domain/port/services/zip.port";
import JSZip from 'jszip';
export class Zip implements ZipService {
  public async unzipBuffer(buffer: Buffer, fileToExtract: string): Promise<string> {
    const zip = new JSZip();
    const extractedFile = await zip.loadAsync(buffer);
    return await extractedFile.file(fileToExtract).async("text");

  }
}