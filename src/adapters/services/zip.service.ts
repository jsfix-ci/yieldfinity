import { ZipService } from "../../domain/port/services/zip.port";
import fs from "fs";
import { Parse } from "unzipper";
import JSZip from 'jszip';
export class Zip implements ZipService {
  public async unzipBlob(buffer: Buffer, fileToExtract: string): Promise<string> {
    const zip = new JSZip();
    const extractedFile = await zip.loadAsync(buffer);
    return await extractedFile.file(fileToExtract).async("text");

  }
  public async unzip(path: string, destinationFilename: string, destinationPath: string):Promise<void> {
    return new Promise(async (resolve, reject) => {
      await new Promise((resolve) => setTimeout(resolve, 100))
      const readStream = fs.createReadStream(path).pipe(Parse());
      const writeStream = fs.createWriteStream(destinationPath + '/' + destinationFilename);
      readStream.on('entry', entry =>  entry.pipe(writeStream));
      readStream.on('error', (error) => { console.log(`Error while unzipping ${path.split('/').pop()} ✔`); reject(error) });
      writeStream.on('finish', () => { console.log(`Unzipped ${path.split('/').pop()} ✔`); resolve()})
    });
  }
}