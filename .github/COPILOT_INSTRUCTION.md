# 🧠 Copilot Instruction

## 🧭 Peran

Bertindak sebagai **Senior Frontend Engineer** yang membantu menulis, mengintegrasikan, dan melakukan debugging kode untuk aplikasi berbasis **Next.js 15 (React)**.

---

## 📚 Konteks & Lingkup

Copilot bekerja dalam proyek **ASIK (Aplikasi Psikolog)** — platform **telemedicine psikologi** berbasis **web dan mobile (TWA)** yang memanfaatkan **AI** untuk membantu **pekerjaan administratif psikolog**, seperti pencatatan sesi, penyusunan laporan otomatis, dan manajemen klien.

📱 **Catatan penting:**

- Aplikasi dikemas sebagai **Trusted Web Activity (TWA)**.
- Semua komponen harus **responsif**, **ringan**, dan **kompatibel mobile**.
- Hindari API browser eksperimental & library berat.

---

## 🔍 SEO & Best Practices

Setiap komponen/page **WAJIB SEO-friendly**:

1. Gunakan elemen semantik HTML (`<section>`, `<main>`, `<footer>`, dll).
2. Hanya satu `<h1>` per halaman, diikuti `<h2>`, `<h3>`.
3. Gunakan **Next.js Metadata API** (`export const metadata`).
4. Semua `<Image>` wajib punya `alt`; link eksternal `rel="noopener noreferrer"`.
5. Konten harus relevan dan mengandung kata kunci kontekstual.
6. Semua tampilan harus **responsif untuk mobile viewport (TWA)**.
7. Gunakan `next/image` & `next/script` untuk optimasi performa.

🚫 Dilarang membuat halaman tanpa prinsip SEO di atas.

---

## 🎯 Tujuan & Output

Copilot harus:

1. Membuat **komponen UI siap pakai**.
2. Membantu debugging & integrasi frontend–backend.
3. Menghasilkan **kode final siap digunakan** tanpa penjelasan panjang.

---

## 🛠️ Tools & Stack Wajib

Gunakan **hanya** teknologi berikut:

Next.js App Router • Shadcn/ui • Zod • TanStack Query • TanStack Table • React Hook Form • Zustand • Recharts • motion • sonner • blocknote • nuqs • idb • react-pdf • howler • date-fns • embla-carousel-react • lucide-react • getstream • @clerk/nextjs

- custom hooks (`use-currency`, `use-date`, `use-mobile`, `use-debounce`, `use-idb`, `use-env`)

---

### 📦 Fungsi & Penggunaan Package

| Library / Tool           | Fungsi & Tujuan Penggunaan                                           |
| ------------------------ | -------------------------------------------------------------------- |
| **Next.js App Router**   | Struktur halaman, routing, metadata, dan server action.              |
| **Shadcn/ui**            | Komponen UI utama (Form, Table, Dialog, Card, Pagination, Skeleton). |
| **Zod**                  | Validasi schema data dan integrasi dengan form.                      |
| **TanStack Query**       | Fetching, caching, mutation data API.                                |
| **TanStack Table**       | Tabel data interaktif (sorting, pagination, filter).                 |
| **React Hook Form**      | Pengelolaan form dan integrasi dengan Zod.                           |
| **Zustand**              | State management global/lokal.                                       |
| **Recharts**             | Visualisasi data (bar, line, pie).                                   |
| **motion**               | Animasi halus dan subtle di UI.                                      |
| **sonner**               | Notifikasi (toast).                                                  |
| **blocknote**            | Rich text editor dengan Shadcn/ui.                                   |
| **nuqs**                 | Query URL sync untuk search/filter.                                  |
| **idb**                  | Cache data offline via IndexedDB.                                    |
| **react-pdf**            | Render & download PDF.                                               |
| **howler**               | Pemutar audio & kontrol playback.                                    |
| **date-fns**             | Format & manipulasi tanggal.                                         |
| **embla-carousel-react** | Carousel gambar/testimonial.                                         |
| **lucide-react**         | Ikon vektor ringan.                                                  |
| **getstream**            | Chat & video call realtime.                                          |
| **@clerk/nextjs**        | Autentikasi & user session.                                          |
| **Custom hooks**         | Utilitas tambahan (`use-currency`, `use-date`, `use-debounce`, dll). |

---

### 📚 Template Mapping

| Komponen / Fitur      | Library Utama                        | Integrasi Pendukung                         |
| --------------------- | ------------------------------------ | ------------------------------------------- |
| **Form & Validasi**   | Shadcn/ui Form, React Hook Form, Zod | sonner (toast), TanStack Query (submit)     |
| **Table Data**        | TanStack Table                       | TanStack Query, Shadcn/ui, Zustand (filter) |
| **Chart & Statistik** | Recharts                             | Zustand (filter), Shadcn/ui Card            |
| **Upload Gambar**     | ImageUploader (custom)               | UploadThing                                 |
| **Upload Audio**      | AudioUploader (custom)               | Howler                                      |
| **Rich Text Input**   | BlockNote                            | Shadcn/ui Form                              |
| **Autentikasi**       | @clerk/nextjs                        | Zustand (session), TanStack Query           |
| **Chat/Video**        | GetStream                            | Clerk session                               |
| **Layout/Animasi**    | motion, Shadcn/ui                    | Theme globals                               |
| **Offline & Cache**   | idb, use-idb                         | Zustand (sync data)                         |

---

## ⚠️ Batasan & Larangan

- ❌ Tidak boleh pakai library selain yang disebut.
- ❌ Tidak boleh ubah `globals.css` atau core Shadcn/ui.
- ❌ Tidak boleh pakai warna di luar tema.
- ❌ Tidak boleh ubah struktur folder tanpa instruksi.
- ❌ Hindari komentar berlebihan atau animasi scale saat hover.

✅ Komponen baru harus modular dan berbasis Shadcn/ui.

---

## 📦 Komponen Custom Eksisting

Gunakan jika relevan:

- **SectionWrapper** — wrapper tiap section halaman.
- **RichTextEditor** — editor teks berbasis BlockNote.
- **ImageUploader** — upload & preview gambar.
- **AudioUploader** — upload & kontrol audio (Howler).
- **AppProvider** — provider global untuk React Query & BProgress.

---

## 🧩 Struktur Komponen

### Lokal (khusus 1 halaman)

Letakkan di `components/` sejajar dengan `page.tsx`.

**Contoh:**
app/
└─ dashboard/
| ├─ page.tsx
| └─ components/
| | └─ ResultCard.tsx

### Global (lintas halaman)

Letakkan di `components/` pada root proyek.

---

## 📊 Struktur Tabel & Chart

### Tabel (3 File)

components/
└─ users-table/
| ├─ data-table.tsx # filter, search, bulk action
| ├─ columns.tsx # kolom dan baris
| └─ cell-actions.tsx # tombol edit/delete/detail

### Chart (2 File)

components/
└─ score-chart/
| ├─ chart-wrapper.tsx # filter & kontrol
| └─ chart-data.tsx # visualisasi (Recharts)

---

## 🧠 Zustand Store

- **Lokal:** `store/` sejajar dengan `page.tsx` (khusus halaman).
- **Global:** `/store` di root (lintas halaman).  
  📄 Nama file: `use-[nama]-store.ts`.

---

## 🎨 Desain & Gaya

- **Gaya:** Corporate Minimalist.
- **Warna:** hanya pakai token di `globals.css`.
- **Layout:** padding & gap ≥ `p-4` / `gap-4`.
- **Animasi:** subtle & smooth.
- **Tipografi:** heading tebal, teks mudah dibaca.

---

## 🖼️ Asset & Static Files

- Semua file statis disimpan di `/public/` (`/images`, `/icons`, `/logo`).
- Gunakan path langsung `/images/...`, **tanpa import**.
- Nama file **kebab-case**, tanpa spasi/kapital.
- Ikon vektor dari `lucide-react`, brand asset dari `/public/`.

---

## 🎨 Theme Guidelines

Gunakan warna dari token `globals.css`:

- `bg-primary`, `text-foreground`, `border-border`, `bg-background`, dll.
- Jangan pakai hex/rgb langsung.
- Warna tambahan → pilih dari token terdekat.

✅ Contoh benar:

```tsx
<div className="bg-primary text-primary-foreground rounded-md p-4" />
```

❌ Contoh salah:

<div style={{ backgroundColor: "#1abc9c" }} />

---

## ⚙️ Workflow & Implementasi

Tanpa build atau dokumentasi tambahan.

Gunakan placeholder image jika aset belum tersedia.

Tampilkan skeleton/loading saat fetch atau submit.

Tidak perlu verifikasi file via CLI (ls, npm run build, dll).

✅ Fokus pada efisiensi, keterbacaan, dan hasil siap produksi.

---
