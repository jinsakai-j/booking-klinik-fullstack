import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { JanjiTemuModule } from './janji-temu/janji-temu.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, JanjiTemuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
