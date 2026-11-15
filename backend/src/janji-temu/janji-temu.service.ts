import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const jadwalDipakai = this.daftarJanji.some(
      (janji) =>
        janji.dokter === createJanjiTemuDto.dokter &&
        janji.tanggal.toISOString().slice(0, 10) ===
          createJanjiTemuDto.tanggal &&
        janji.jam === createJanjiTemuDto.jam,
    );

    if (jadwalDipakai) {
      throw new ConflictException(
        'Jadwal dokter tersebut sudah dipesan pada tanggal dan jam yang sama',
      );
    }

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

  findOne(id: number): JanjiTemu {
    const janji = this.daftarJanji.find((item) => item.id === id);

    if (!janji) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
    }

    return janji;
  }

  update(id: number, updateJanjiTemuDto: UpdateJanjiTemuDto): JanjiTemu {
    const index = this.daftarJanji.findIndex((janji) => janji.id === id);

    if (index === -1) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
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

  remove(id: number): JanjiTemu {
    const index = this.daftarJanji.findIndex((janji) => janji.id === id);

    if (index === -1) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
    }

    const [janjiDihapus] = this.daftarJanji.splice(index, 1);
    return janjiDihapus;
  }
}
