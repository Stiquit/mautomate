import { Module } from '@nestjs/common';
import { UtilitiesService } from './services/utilites.service';

@Module({
  exports: [UtilitiesService],
  providers: [UtilitiesService],
})
export class SharedModule {}
