import { Module } from '@nestjs/common';
import { SaveFileService } from './save-file.service';

@Module({
  providers: [SaveFileService],
  exports: [SaveFileService],
})
export class SaveFileModule {}
