import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JanjiTemuService } from './janji-temu.service.js';
import { CreateJanjiTemuDto } from './dto/create-janji-temu.dto.js';
import { UpdateJanjiTemuDto } from './dto/update-janji-temu.dto.js';

@Controller('janji-temu')
export class JanjiTemuController {
  constructor(private readonly janjiTemuService: JanjiTemuService) {}

  @Post()
  create(@Body() createJanjiTemuDto: CreateJanjiTemuDto) {
    return this.janjiTemuService.create(createJanjiTemuDto);
  }

  @Get()
  findAll() {
    return this.janjiTemuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.janjiTemuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJanjiTemuDto: UpdateJanjiTemuDto) {
    return this.janjiTemuService.update(+id, updateJanjiTemuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.janjiTemuService.remove(+id);
  }
}
