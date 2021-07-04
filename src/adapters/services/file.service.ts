import Path from "path";
import axios from "axios";
import { FileService } from "../../domain/port/services/file.port";
import fs from "fs";
import tmp from "tmp";


export class File implements FileService {
  public async delete(filePath: string): Promise<void> {
    fs.unlinkSync(filePath);
  }

  public read(filePath: string): string {
    return fs.readFileSync(filePath, 'utf-8');
  }

  public write(filePath: string, data:string): void {
    fs.writeFileSync(filePath, data);
  }

  public appendFile(filePath: string, data:string): void {
    fs.appendFileSync(filePath, data);
  }

  public temporaryFile(extension: string):string {
    return tmp.fileSync({ mode: 0o644, prefix: `${Math.ceil(Math.random() * 10000)}`, postfix: extension }).name;
  }

  public temporaryFolder():string {
    return tmp.dirSync().name;
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