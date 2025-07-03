import { Injectable } from '@nestjs/common';
import fsPromises from 'fs/promises';
import path from 'path';

@Injectable()
export class ImageService {
  async saveImages(
    files: Record<string, Express.Multer.File[]>,
  ): Promise<Record<string, string>> {
    const returnedFiles = {};
    for (const [key, value] of Object.entries(files)) {
      if (value && value.length > 0) {
        const file = value[0];
        if (file) {
          const filePath = path.join(
            __dirname,
            '..',
            'files',
            key,
            file.originalname,
          );
          // Ensure the directory exists before writing the file
          await fsPromises.mkdir(path.dirname(filePath), { recursive: true });
          await fsPromises.writeFile(filePath, file.buffer);
          returnedFiles[key] = [filePath]; // Update the path in the files object
        }
      }
    }
    return returnedFiles;
  }

  async deleteImages(
    files: Record<string, Express.Multer.File[]>,
  ): Promise<void> {
    for (const [key, value] of Object.entries(files)) {
      if (value && value.length > 0) {
        const file = value[0];
        const filePath = path.join(
          __dirname,
          '..',
          'files',
          key,
          file.originalname,
        );
        try {
          await fsPromises.unlink(filePath);
        } catch (error) {
          console.error(`Error deleting file ${filePath}:`, error);
        }
      }
    }
  }
}
