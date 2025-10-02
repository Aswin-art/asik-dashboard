# ASIK Dashboard (Aplikasi Psikologi)

ASIK adalah platform dashboard modern untuk layanan psikologi dan konseling yang berfokus pada: akses cepat terhadap data klien, manajemen jadwal yang efisien, pencatatan sesi yang terstruktur, serta analitik untuk mendukung pengambilan keputusan klinis & operasional.

> Nama "ASIK" dapat dimaknai sebagai: Aplikasi Sistem Informasi Konseling.

## Tujuan Utama
- Mempermudah psikolog (dokter) mengelola pasien, sesi, dan jadwal.
- Menyediakan alat monitoring progres konseling & riwayat sesi secara aman.
- Mendukung admin dalam mengelola operasional platform (pengguna & pesanan/booking).
- Menyediakan insight berbasis data (engagement, retensi, utilisasi jadwal).
- Menjadi fondasi extensible untuk fitur lanjutan (AI summarization, mood tracking, outcome scoring, dsb).

## Peran & Navigasi
### Role: Doctor (Default)
| Fitur | Path (rencana) | Deskripsi Singkat |
|-------|----------------|-------------------|
| Analytics & Insights | `/dashboard/doctor/analytics` | Ringkasan jumlah pasien aktif, sesi minggu ini, outcome trends. |
| Schedule Management | `/dashboard/doctor/schedule` | Kalender jadwal, blok waktu, ketersediaan & reschedule. |
| Patient Management | `/dashboard/doctor/patients` | Daftar pasien, pencarian, status, riwayat sesi ringkas. |
| Counseling Management | `/dashboard/doctor/counseling` | Catatan sesi, progres, rencana intervensi, follow‑up. |
| Profile | `/dashboard/doctor/profile` | Data profesional, bio, spesialisasi, availability preference. |

### Role: Admin
| Fitur | Path (rencana) | Deskripsi Singkat |
|-------|----------------|-------------------|
| Analytics & Insights | `/dashboard/admin/analytics` | KPI platform: booking rate, retention, active practitioners. |
| User Management | `/dashboard/admin/users` | Manajemen psikolog & pasien (aktif/nonaktif, onboarding). |
| Order Management | `/dashboard/admin/orders` | Booking/pembayaran, status transaksi, paket layanan. |

---
**Fokus: membangun alat psikologi yang human-centered, aman, & scalable.**
