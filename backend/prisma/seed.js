import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const daftarJanji = [
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

async function main() {
  for (const janji of daftarJanji) {
    await prisma.janjiTemu.upsert({
      where: { id: janji.id },
      update: janji,
      create: janji,
    });
  }

  await prisma.$executeRaw`
    SELECT setval(pg_get_serial_sequence('janji_temu', 'id'),
      (SELECT COALESCE(MAX(id), 1) FROM janji_temu))
  `;

  console.log(`Seed selesai: ${daftarJanji.length} janji temu`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
