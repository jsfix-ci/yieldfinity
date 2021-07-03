import Path from "path";
import axios from "axios";
import fs from "fs";
import { FileService } from "../../domain/port/services/file.port";


export class File implements FileService {
  public async delete(filePath: string): Promise<void> {
    fs.unlinkSync(filePath);
  }

  public async read(filePath: string): Promise<string> {
    return fs.readFileSync(filePath, 'utf-8');
  }

  public async download(url: string, filename: string, destination: string):Promise<void> {
    const path = Path.resolve(destination, filename);
    const writer = fs.createWriteStream(path);
    const response = await axios({ url, method: 'GET', responseType: 'stream' })
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => { console.log(`Downloaded ${filename} ✔`); setTimeout(resolve, 1000); });
      writer.on('error',  () => { console.log(`Error while downloading ${filename} ❌`); reject();  })
    })
  }
}