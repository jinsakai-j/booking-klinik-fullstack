# Booking Klinik Sejahtera

Aplikasi untuk mengelola janji temu pasien di klinik. Pasien bisa membuat
janji temu baru, mengubah jadwal yang sudah dibuat, dan melihat daftar
janji temu yang terdaftar.

Project ini adalah lanjutan dari tugas web sebelumnya, sekarang dibagi
jadi dua bagian:

- `frontend/`, aplikasi React (Vite) yang menampilkan halaman booking
- `backend/`, API NestJS yang mengelola data janji temu

Data utama yang dikelola adalah janji temu, isinya data pasien (nama,
nomor HP) dan data appointment (dokter, tanggal, jam, keluhan, status).

## Cara menjalankan

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run start:dev
```

Frontend jalan di http://localhost:5173 dan backend di
http://localhost:3000.

Rajaa Azharul Hanafi - 103022400116
