import { Injectable } from '@nestjs/common';
import { CreateJanjiTemuDto } from './dto/create-janji-temu.dto.js';
import { UpdateJanjiTemuDto } from './dto/update-janji-temu.dto.js';
import { JanjiTemu } from './entities/janji-temu.entity.js';

@Injectable()
export class JanjiTemuService {
  private daftarJanji: JanjiTemu[] = [
    {
      id: 1,
      namaPasien: 'Rani Puspitasari',
      noHp: '081234567890',
      dokter: 'dr. Amira Larasati, Sp.A',
      tanggal: new Date('2026-11-17T09:00:00+07:00'),
      jam: '09.00',
      keluhan: 'Demam dan batuk sejak tiga hari',
      status: 'Konfirmasi',
    },
    {
      id: 2,
      namaPasien: 'Dimas Prakoso',
      noHp: '085712345678',
      dokter: 'dr. Budi Santosa, Sp.PD',
      tanggal: new Date('2026-11-17T10:30:00+07:00'),
      jam: '10.30',
      keluhan: 'Kontrol gula darah bulanan',
      status: 'Menunggu',
    },
    {
      id: 3,
      namaPasien: 'Siti Nurhaliza',
      noHp: '081399887766',
      dokter: 'dr. Citra Maharani, Sp.OG',
      tanggal: new Date('2026-11-18T13:00:00+07:00'),
      jam: '13.00',
      keluhan: 'Pemeriksaan kehamilan rutin',
      status: 'Konfirmasi',
    },
  ];

  private idBerikutnya = 4;

  create(createJanjiTemuDto: CreateJanjiTemuDto): JanjiTemu {
    const janjiBaru: JanjiTemu = {
      id: this.idBerikutnya++,
      namaPasien: createJanjiTemuDto.namaPasien,
      noHp: createJanjiTemuDto.noHp,
      dokter: createJanjiTemuDto.dokter,
      tanggal: new Date(createJanjiTemuDto.tanggal),
      jam: createJanjiTemuDto.jam,
      keluhan: createJanjiTemuDto.keluhan,
      status: createJanjiTemuDto.status ?? 'Menunggu',
    };

    this.daftarJanji.push(janjiBaru);
    return janjiBaru;
  }

  findAll(): JanjiTemu[] {
    return this.daftarJanji;
  }

  findOne(id: number): JanjiTemu | undefined {
    return this.daftarJanji.find((janji) => janji.id === id);
  }

  update(id: number, updateJanjiTemuDto: UpdateJanjiTemuDto): JanjiTemu | null {
    const index = this.daftarJanji.findIndex((janji) => janji.id === id);
    if (index === -1) {
      return null;
    }

    const janjiLama = this.daftarJanji[index];
    const janjiBaru: JanjiTemu = {
      ...janjiLama,
      ...updateJanjiTemuDto,
      tanggal: updateJanjiTemuDto.tanggal
        ? new Date(updateJanjiTemuDto.tanggal)
        : janjiLama.tanggal,
    };

    this.daftarJanji[index] = janjiBaru;
    return janjiBaru;
  }

  remove(id: number): JanjiTemu | null {
    const index = this.daftarJanji.findIndex((janji) => janji.id === id);
    if (index === -1) {
      return null;
    }

    const [janjiDihapus] = this.daftarJanji.splice(index, 1);
    return janjiDihapus;
  }
}
