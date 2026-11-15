import { Module } from '@nestjs/common';
import { JanjiTemuService } from './janji-temu.service.js';
import { JanjiTemuController } from './janji-temu.controller.js';

@Module({
  controllers: [JanjiTemuController],
  providers: [JanjiTemuService],
})
export class JanjiTemuModule {}
