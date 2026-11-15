# Booking Klinik Sejahtera

Aplikasi untuk mengelola janji temu pasien di klinik. Pasien bisa membuat
janji temu baru, mengubah jadwal yang sudah dibuat, dan melihat daftar
janji temu yang terdaftar.

Project ini adalah lanjutan dari tugas web sebelumnya, sekarang aplikasinya
dibagi jadi dua bagian:

- `frontend/`, aplikasi React (Vite) yang menampilkan halaman booking
- `backend/`, API NestJS yang mengelola data janji temu

Data utama yang dikelola adalah janji temu, isinya data pasien (nama, nomor
HP) dan data appointment (dokter, tanggal, jam, keluhan, status).

## Fitur

- Menampilkan daftar janji temu dari API
- Menambah janji temu baru lewat form
- Mengubah janji temu, form otomatis terisi data lama
- Menghapus janji temu dengan konfirmasi
- Ringkasan jumlah janji temu, konfirmasi, dan menunggu
- Validasi input di backend dan pesan error kalau data tidak ditemukan
  atau jadwal dokter bentrok

## Struktur folder

```
booking-klinik-fullstack/
├─ frontend/          aplikasi React (Vite)
│  └─ src/
│     ├─ components/  komponen tampilan
│     ├─ data/        data dokter
│     └─ services/    pemanggilan API janji temu
├─ backend/           API NestJS
│  └─ src/
│     └─ janji-temu/  module, controller, service, dto, entity
└─ docs/screenshots/  screenshot pengujian dan integrasi
```

## Teknologi

- Frontend: React, Vite, CSS
- Backend: NestJS, TypeScript, class-validator
- Data disimpan sementara di array memori (belum pakai database)

## Cara menjalankan

Jalankan backend dulu:

```bash
cd backend
npm install
npm run start:dev
```

Lalu frontend di terminal lain:

```bash
cd frontend
npm install
npm run dev
```

Backend jalan di http://localhost:3000 dan frontend di
http://localhost:5173. Data janji temu disimpan di memori, jadi kalau
backend di-restart datanya kembali ke data awal.

## Endpoint API

| Method | Endpoint         | Keterangan                                              |
| ------ | ---------------- | ------------------------------------------------------- |
| GET    | `/janji-temu`    | Ambil semua janji temu                                  |
| GET    | `/janji-temu/:id`| Ambil satu janji temu, 404 kalau tidak ada              |
| POST   | `/janji-temu`    | Tambah janji temu, 400 kalau tidak valid, 409 kalau bentrok |
| PATCH  | `/janji-temu/:id`| Ubah janji temu, 404 kalau tidak ada                     |
| DELETE | `/janji-temu/:id`| Hapus janji temu, 404 kalau tidak ada                    |

Validasi yang dipakai di DTO:

- `namaPasien` minimal 3 karakter
- `noHp` diawali 08 dan 10 sampai 13 digit
- `dokter` minimal 3 karakter
- `tanggal` format `YYYY-MM-DD`
- `jam` format `HH.MM`
- `keluhan` minimal 5 karakter
- `status` opsional, isinya `Menunggu` atau `Konfirmasi`

## Screenshot pengujian endpoint

Pengujian pakai REST Client di VS Code, file request-nya ada di
`backend/janji-temu.http`.

### GET semua janji temu

![GET semua janji temu](docs/screenshots/tugas9/01-get-semua-janji-temu.png)

### GET satu janji temu

![GET satu janji temu](docs/screenshots/tugas9/02-get-janji-temu-id-1.png)

### GET janji temu yang tidak ada (404)

![GET janji temu 404](docs/screenshots/tugas9/03-get-janji-temu-404.png)

### POST tambah janji temu (201)

![POST janji temu](docs/screenshots/tugas9/04-post-janji-temu-201.png)

### POST data tidak valid (400)

![POST validasi 400](docs/screenshots/tugas9/05-post-validasi-400.png)

### POST jadwal bentrok (409)

![POST konflik 409](docs/screenshots/tugas9/06-post-jadwal-bentrok-409.png)

### PATCH ubah janji temu (200)

![PATCH janji temu](docs/screenshots/tugas9/07-patch-janji-temu-200.png)

### PATCH janji temu yang tidak ada (404)

![PATCH janji temu 404](docs/screenshots/tugas9/08-patch-janji-temu-404.png)

### DELETE hapus janji temu (200)

![DELETE janji temu](docs/screenshots/tugas9/09-delete-janji-temu-200.png)

### DELETE janji temu yang sudah dihapus (404)

![DELETE janji temu 404](docs/screenshots/tugas9/10-delete-janji-temu-404.png)

## Screenshot integrasi frontend

### Halaman utama, data diambil dari API

![Halaman utama](docs/screenshots/tugas9/integrasi/01-halaman-utama-data-api.png)

### Form tambah janji temu

![Form tambah](docs/screenshots/tugas9/integrasi/02-form-tambah-janji.png)

### Hasil tambah janji temu

![Hasil tambah](docs/screenshots/tugas9/integrasi/03-hasil-tambah-janji.png)

### Form ubah janji temu, data lama otomatis terisi

![Form ubah](docs/screenshots/tugas9/integrasi/04-form-ubah-janji.png)

### Hasil ubah janji temu

![Hasil ubah](docs/screenshots/tugas9/integrasi/05-hasil-ubah-janji.png)

### Hasil hapus janji temu

![Hasil hapus](docs/screenshots/tugas9/integrasi/06-hasil-hapus-janji.png)

Rajaa Azharul Hanafi - 103022400116
