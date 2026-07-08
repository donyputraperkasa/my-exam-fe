# Features

Folder ini berisi kode per domain fitur.

- `auth`: login, register, session.
- `admin`: dashboard dan pengelolaan data admin.
- `student`: dashboard siswa, paket soal, hasil, pembahasan.
- `grades`, `subjects`, `questions`, `packages`: domain latihan ujian.
- `attempts`, `subscriptions`: pengerjaan soal dan akses premium.

Aturan ringkas: route di `src/app` dibuat tipis, logic utama taruh di feature
terkait.
