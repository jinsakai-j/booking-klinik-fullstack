# Booking Klinik Sejahtera

Aplikasi untuk mengelola janji temu pasien di klinik. Dalam aplikasi ini
pasien bisa membuat janji temu baru, mengubah jadwal yang sudah dibuat,
dan melihat rincian appointment.

Project ini adalah versi React dari tugas web sebelumnya. Frontend-nya
dibuat pakai Vite, jadi untuk menjalankan cukup install dependency lalu
`npm run dev`, nanti terbuka di http://localhost:5173.

Data yang disimpan berupa data pasien (nama dan nomor HP) dan data
appointment (dokter, tanggal, jam, keluhan, dan status).

Untuk update terakhir, aplikasi sudah lengkap. Data janji temu diambil dari
API backend NestJS, jadi frontend dan backend dijalankan bareng (backend di
http://localhost:3000).

Rajaa Azharul Hanafi - 103022400116


## Update week6

Sudah dibuat versi React menggunakan Vite. Aplikasi ini punya 5 komponen: Header, RingkasanJanji, FormJanjiTemu, DaftarJanji, dan KartuJanjiTemu. Daftar janji disimpan sebagai state di App.jsx dan ditampilkan dengan .map() menggunakan key unik. Form tambah janji dibuat sebagai controlled component, tombol Tambah menambahkan data baru dengan status awal Menunggu. Jika daftar masih kosong akan muncul teks "Belum ada data Janji Temu". Tampilan sudah diatur sedikit biar lebih rapi dan menyesuaikan layar kecil.

Link repository: https://github.com/jinsakai-j/booking-klinik-frontend


## Update week7

Ditambahkan fitur konsumsi API untuk menampilkan "Tips Kesehatan". Endpoint yang dipakai: https://dummyjson.com/quotes?limit=5 (diambil pakai fetch()). Dipilih karena datanya sederhana, gratis, mendukung CORS, relevan buat tampilan tambahan di aplikasi klinik.

Implementasi: komponen src/components/TipsKesehatan.jsx pakai useEffect untuk fetch saat komponen dimount, useState untuk data, loading, dan error. Saat loading ditampilkan "Memuat tips kesehatan...". Saat error muncul pesan error dan tombol "Coba Lagi" (interaksi untuk mengulang pengambilan data). Saat berhasil, data ditampilkan pakai .map() dengan key unik ke dalam kartu. Section ini ditambahkan di App.jsx di bawah DaftarJanjiTemu.


## Update week9

Frontend disambungkan ke backend NestJS. Data janji temu sekarang diambil dari http://localhost:3000/janji-temu, bukan dari file data dummy lagi.

Perubahannya:

- `src/services/janjiTemu.js` berisi fungsi fetch untuk ambil, tambah, ubah, dan hapus janji temu
- `App.jsx` mengambil data dari API saat halaman dibuka, ada tampilan loading dan pesan error dengan tombol "Coba Lagi"
- Form tambah mengirim POST, tiap kartu punya tombol Ubah (PATCH) dan Hapus (DELETE pakai konfirmasi)
- `src/data/janjiTemu.js` dihapus karena data sudah dari backend

Link repository: https://github.com/jinsakai-j/booking-klinik-fullstack

Screenshot alur integrasi ada di `docs/screenshots/tugas9/integrasi/`.
