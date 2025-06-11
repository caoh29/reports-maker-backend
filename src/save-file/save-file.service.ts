import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

@Injectable()
export class SaveFileService {
  async saveFile(fileName: string, content: string): Promise<string> {
    const filePath = path.join(__dirname, '..', 'files', fileName);
    // Ensure the directory exists before writing the file
    if (fs.existsSync(filePath)) {
      // If the file already exists, you might want to handle it differently
      console.log(`File ${fileName} already exists. Located in ${filePath}`);
    } else {
      // Write the content to the file
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, content);
    }
    return Promise.resolve(filePath);
  }
}
