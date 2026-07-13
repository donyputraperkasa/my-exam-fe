# My Exam Frontend

Frontend Next.js untuk landing page, dashboard siswa, dashboard guru, dan panel
admin My Exam. Backend berjalan terpisah di port `4000`.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:3000`
- `NEXT_PUBLIC_API_URL` harus mengarah ke backend, misalnya
  `http://localhost:4000`.

## Struktur

- `src/app`: route dan komposisi halaman.
- `src/features`: UI, hook, dan API client milik satu fitur bisnis.
- `src/components/ui`: komponen dasar reusable.
- `src/components/layout`: shell, sidebar, breadcrumb, dan background.
- `src/lib`: konfigurasi, route, serta helper lintas fitur.
- `src/types`: kontrak data bersama dari backend.

Halaman sebaiknya tipis. State dan request ditempatkan di `features`, sedangkan
komponen yang dipakai banyak fitur ditempatkan di `components`.

## Alur Trial

- `/trial` menggunakan tepat 10 soal lokal dan menghitung skor di browser.
  Alur ini tidak mengambil atau menyimpan hasil ke backend.
- `/student/trial` menggunakan soal backend dan menyimpan hasil ke recap akun.
- Paket premium selalu menggunakan attempt backend agar skor dan status paket
  tetap tersedia setelah pengguna login ulang.

## Konvensi Maintenance

- Komentar menjelaskan alasan bisnis atau perbedaan alur, bukan mengulang JSX.
- Hindari JSX satu baris yang panjang hanya demi mengejar batas file.
- Satu file dibatasi 200 baris oleh `npm run lint:lines`.
- Pecah file lebih awal bila memiliki lebih dari satu tanggung jawab besar.
- Semua request harus melalui client API dan membawa token untuk route privat.
- Route role disimpan terpusat agar redirect dan sidebar tidak berbeda aturan.

## Verifikasi

```bash
npm run lint
npm run lint:lines
npm run build
```

Sebelum release, uji alur register/login, pembayaran manual, paket dan recap,
serta mode ujian guru pada desktop dan mobile.
