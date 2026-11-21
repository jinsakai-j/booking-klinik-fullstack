import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJanjiTemuDto } from './dto/create-janji-temu.dto.js';
import { UpdateJanjiTemuDto } from './dto/update-janji-temu.dto.js';
import { JanjiTemu } from './entities/janji-temu.entity.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JanjiTemuService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createJanjiTemuDto: CreateJanjiTemuDto): Promise<JanjiTemu> {
    const mulai = new Date(`${createJanjiTemuDto.tanggal}T00:00:00.000Z`);
    const sampai = new Date(mulai);
    sampai.setUTCDate(sampai.getUTCDate() + 1);

    const jadwalDipakai = await this.prisma.janjiTemu.findFirst({
      where: {
        dokter: createJanjiTemuDto.dokter,
        jam: createJanjiTemuDto.jam,
        tanggal: { gte: mulai, lt: sampai },
      },
    });

    if (jadwalDipakai) {
      throw new ConflictException(
        'Jadwal dokter tersebut sudah dipesan pada tanggal dan jam yang sama',
      );
    }

    const janjiBaru = await this.prisma.janjiTemu.create({
      data: {
        namaPasien: createJanjiTemuDto.namaPasien,
        noHp: createJanjiTemuDto.noHp,
        dokter: createJanjiTemuDto.dokter,
        tanggal: mulai,
        jam: createJanjiTemuDto.jam,
        keluhan: createJanjiTemuDto.keluhan,
        status: createJanjiTemuDto.status ?? 'Menunggu',
      },
    });

    return janjiBaru as JanjiTemu;
  }

  async findAll(): Promise<JanjiTemu[]> {
    const daftarJanji = await this.prisma.janjiTemu.findMany({
      orderBy: { id: 'asc' },
    });

    return daftarJanji as JanjiTemu[];
  }

  async findOne(id: number): Promise<JanjiTemu> {
    const janji = await this.prisma.janjiTemu.findUnique({ where: { id } });

    if (!janji) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
    }

    return janji as JanjiTemu;
  }

  async update(
    id: number,
    updateJanjiTemuDto: UpdateJanjiTemuDto,
  ): Promise<JanjiTemu> {
    const janjiLama = await this.prisma.janjiTemu.findUnique({
      where: { id },
    });

    if (!janjiLama) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
    }

    const janjiTerubah = await this.prisma.janjiTemu.update({
      where: { id },
      data: {
        ...updateJanjiTemuDto,
        ...(updateJanjiTemuDto.tanggal
          ? { tanggal: new Date(updateJanjiTemuDto.tanggal) }
          : {}),
      },
    });

    return janjiTerubah as JanjiTemu;
  }

  async remove(id: number): Promise<JanjiTemu> {
    const janji = await this.prisma.janjiTemu.findUnique({ where: { id } });

    if (!janji) {
      throw new NotFoundException(`Janji temu dengan id ${id} tidak ditemukan`);
    }

    const janjiDihapus = await this.prisma.janjiTemu.delete({ where: { id } });
    return janjiDihapus as JanjiTemu;
  }
}
