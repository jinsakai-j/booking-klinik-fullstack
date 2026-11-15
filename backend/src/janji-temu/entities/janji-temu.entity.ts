export type StatusJanji = 'Menunggu' | 'Konfirmasi';

export class JanjiTemu {
  id: number;
  namaPasien: string;
  noHp: string;
  dokter: string;
  tanggal: Date;
  jam: string;
  keluhan: string;
  status: StatusJanji;
}
