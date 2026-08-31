# 🚀 DPB.DEV — Portfolio Deni Prastya Budi

> **Fullstack Developer · Fresh Graduate**  
> Membangun aplikasi web end-to-end — dari REST API dan database hingga antarmuka pengguna yang responsif.

---

## 📖 Tentang Proyek

Website portofolio personal untuk **Deni Prastya Budi**, seorang Fullstack Developer lulusan S1 Sistem Informasi UIN Raden Intan Lampung. Dibangun dengan HTML, CSS, dan JavaScript vanilla murni tanpa framework, mengandalkan arsitektur berbasis JSON API lokal untuk memisahkan data dari tampilan.

---

## ✨ Fitur

- 🏠 **Halaman Home** — Hero section dengan statistik & profil singkat
- 💼 **Halaman Projects** — Daftar proyek dengan detail lengkap
- 🛠️ **Halaman Experience** — Pengalaman kerja & pencapaian
- 📬 **Halaman Contact** — Informasi kontak & tautan sosial
- 📱 **Responsif** — Mendukung tampilan mobile, tablet, dan desktop
- ⚡ **Data-Driven** — Konten dikelola melalui file JSON di folder `api/`
- 🎨 **Desain Modern** — Tipografi Space Mono & Syne, efek glassmorphism, dan animasi halus

---

## 🗂️ Struktur Proyek

```
inedpb14/
├── index.html                  # Entry point utama
├── pages/
│   ├── contact.html            # Halaman kontak
│   ├── experience.html         # Halaman pengalaman
│   ├── projects.html           # Halaman daftar proyek
│   └── project-detail.html     # Halaman detail proyek
├── css/
│   └── styles.css              # Stylesheet utama
├── js/
│   ├── data-contract.js        # Modul fetch & validasi data JSON
│   └── main.js                 # Logic rendering halaman
├── api/                        # "Backend" lokal berbasis JSON
│   ├── profile.json            # Data profil & statistik
│   ├── navigation.json         # Item navigasi
│   ├── skills.json             # Daftar keahlian teknis
│   ├── projects.json           # Daftar proyek (ringkasan)
│   ├── project-details.json    # Detail lengkap setiap proyek
│   ├── experience.json         # Pengalaman & riwayat kerja
│   ├── achievements.json       # Pencapaian & penghargaan
│   ├── contact.json            # Info kontak & tautan sosial
│   └── pages.json              # Konfigurasi konten per halaman
└── assets/
    └── favicon.svg             # Ikon website
```

---

## 🛠️ Tech Stack

| Kategori            | Teknologi                              |
| ------------------- | -------------------------------------- |
| **Frontend**        | HTML5, CSS3, JavaScript (Vanilla ES6+) |
| **Tipografi**       | Google Fonts — Space Mono, Syne        |
| **Data Layer**      | JSON (local file-based API)            |
| **Version Control** | Git & GitHub                           |

---

## 🚀 Cara Menjalankan

Proyek ini adalah static site murni. Cukup jalankan dengan local server agar fetch JSON bekerja dengan benar.

### Menggunakan VS Code Live Server

1. Install ekstensi **Live Server** di VS Code
2. Klik kanan pada `index.html` → **Open with Live Server**

### Menggunakan Python (HTTP Server)

```bash
# Python 3
python -m http.server 8080
```

Kemudian buka `http://localhost:8080` di browser.

### Menggunakan Node.js (npx serve)

```bash
npx serve .
```

> ⚠️ **Jangan buka `index.html` langsung via `file://`** karena fetch API tidak akan bekerja akibat CORS policy browser.

---

## 📝 Mengelola Konten

Semua konten website dikelola melalui file JSON di folder `api/`. Tidak perlu menyentuh kode HTML/JS untuk memperbarui data.

### Memperbarui Profil

Edit `api/profile.json`:

```json
{
  "name": "Nama Kamu",
  "role": "Role · Status",
  "heroDescription": "Deskripsi singkat tentang dirimu.",
  "email": "email@example.com",
  "github": "https://github.com/username"
}
```

### Menambah Proyek Baru

Tambahkan entri di `api/projects.json` dan `api/project-details.json` dengan format yang sudah ada.

---

## 👤 Kontak

|            |                                                    |
| ---------- | -------------------------------------------------- |
| **Nama**   | Deni Prastya Budi                                  |
| **Email**  | deniprastyabudi@gmail.com                          |
| **GitHub** | [github.com/inedpb14](https://github.com/inedpb14) |
| **Lokasi** | Bandar Lampung, Lampung                            |

---

## 📄 Lisensi

Proyek ini bersifat pribadi (personal portfolio). Silakan jadikan referensi atau inspirasi, namun mohon tidak menyalin konten secara langsung.

---

<p align="center">
  Dibuat oleh <strong>Deni Prastya Budi</strong> · 2026
</p>
