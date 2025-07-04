import { Injectable } from '@nestjs/common';
import fs from 'fs';
import fsPromises from 'fs/promises';
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
      await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
      await fsPromises.writeFile(filePath, content);
      console.log(`File ${fileName} saved successfully at ${filePath}`);
    }
    return filePath;
  }
}
