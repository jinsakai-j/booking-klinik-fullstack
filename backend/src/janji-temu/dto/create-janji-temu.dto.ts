import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import type { StatusJanji } from '../entities/janji-temu.entity.js';

export class CreateJanjiTemuDto {
  @IsString()
  @MinLength(3, { message: 'Nama pasien minimal 3 karakter' })
  namaPasien: string;

  @IsString()
  @Matches(/^08\d{8,11}$/, {
    message: 'Nomor HP harus diawali 08 dan terdiri dari 10 sampai 13 digit',
  })
  noHp: string;

  @IsString()
  @MinLength(3, { message: 'Nama dokter minimal 3 karakter' })
  dokter: string;

  @IsDateString({}, { message: 'Tanggal harus memakai format YYYY-MM-DD' })
  tanggal: string;

  @IsString()
  @Matches(/^([01]\d|2[0-3])[.:][0-5]\d$/, {
    message: 'Jam harus memakai format HH.MM',
  })
  jam: string;

  @IsString()
  @MinLength(5, { message: 'Keluhan minimal 5 karakter' })
  keluhan: string;

  @IsOptional()
  @IsIn(['Menunggu', 'Konfirmasi'], {
    message: 'Status harus Menunggu atau Konfirmasi',
  })
  status?: StatusJanji;
}
