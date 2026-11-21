-- CreateTable
CREATE TABLE "janji_temu" (
    "id" SERIAL NOT NULL,
    "namaPasien" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "dokter" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "jam" TEXT NOT NULL,
    "keluhan" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Menunggu',

    CONSTRAINT "janji_temu_pkey" PRIMARY KEY ("id")
);
