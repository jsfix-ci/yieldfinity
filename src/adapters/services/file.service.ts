import Path from "path";
import axios, { AxiosResponse } from "axios";
import { FileService } from "../../domain/port/services/file.port";
import fs from "fs";
import tmp from "tmp";


export class File implements FileService {
  public async downloadAsBuffer(url: string):Promise<Buffer> {
    const response = await axios({ url, method: 'GET', responseType: 'arraybuffer' })
    return response.data;
  }
}