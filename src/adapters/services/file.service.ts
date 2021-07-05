import axios from "axios";
import { FileService } from "../../domain/port/services/file.port";


export class File implements FileService {
  public async downloadAsBuffer(url: string):Promise<Buffer> {
    const response = await axios({ url, method: 'GET', responseType: 'arraybuffer' })
    return response.data;
  }
}