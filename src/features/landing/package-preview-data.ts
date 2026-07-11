import { BookOpenCheck, Lock, Presentation, Trophy } from "lucide-react";

export const previewPackages = [
  {
    title: "Free",
    price: "Rp0",
    meta: "Coba alur latihan My Exam sebelum register.",
    features: ["10 soal publik tanpa login", "1 paket free setelah register", "Cocok untuk mencoba fitur dasar"],
    Icon: BookOpenCheck,
    badge: "Starter",
    tone: "slate",
  },
  {
    title: "Paket Premium 1",
    price: "Segera hadir",
    meta: "Latihan intensif selama 30 hari.",
    features: ["Akses semua paket", "Pembahasan lengkap", "Recap nilai"],
    Icon: Trophy,
    badge: "Paling Populer",
    tone: "violet",
  },
  {
    title: "Paket Premium 2",
    price: "Segera hadir",
    meta: "Lebih hemat untuk latihan rutin.",
    features: ["Semua fitur premium", "Masa aktif 90 hari", "Persiapan jangka panjang"],
    Icon: Lock,
    badge: "Best Value",
    tone: "amber",
  },
  {
    title: "Paket Premium 3",
    price: "Segera hadir",
    meta: "Paket lanjutan untuk drilling per materi.",
    features: ["Pembahasan mendalam", "Latihan tambahan", "Target skor lebih tinggi"],
    Icon: Lock,
    badge: "Locked",
    tone: "violet",
  },
  {
    title: "Mode Ujian",
    price: "Segera hadir",
    meta: "Paket ujian untuk guru dengan link dan PIN murid.",
    features: ["Buat ujian sendiri", "Share link ke murid", "Mode fokus ujian", "Download dan lihat recap nilai"],
    Icon: Presentation,
    badge: "Coming Soon",
    tone: "amber",
  },
];
