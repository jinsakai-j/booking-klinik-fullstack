import { PartialType } from '@nestjs/mapped-types';
import { StatusJanji } from '../entities/janji-temu.entity.js';

export class CreateJanjiTemuDto {
  namaPasien: string;
  noHp: string;
  dokter: string;
  tanggal: string;
  jam: string;
  keluhan: string;
  status?: StatusJanji;
}

export class UpdateJanjiTemuDto extends PartialType(CreateJanjiTemuDto) {}
