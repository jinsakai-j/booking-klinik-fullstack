import { Injectable } from '@nestjs/common';
import { CreateJanjiTemuDto } from './dto/create-janji-temu.dto.js';
import { UpdateJanjiTemuDto } from './dto/update-janji-temu.dto.js';

@Injectable()
export class JanjiTemuService {
  create(createJanjiTemuDto: CreateJanjiTemuDto) {
    return 'This action adds a new janjiTemu';
  }

  findAll() {
    return `This action returns all janjiTemu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} janjiTemu`;
  }

  update(id: number, updateJanjiTemuDto: UpdateJanjiTemuDto) {
    return `This action updates a #${id} janjiTemu`;
  }

  remove(id: number) {
    return `This action removes a #${id} janjiTemu`;
  }
}
