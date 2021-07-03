import { ZipService } from "../../domain/port/services/zip.port";
import fs from "fs";
import { Parse } from "unzipper";
export class Zip implements ZipService {
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