# 🧠 Copilot Instruction

## 🧭 Peran

Bertindak sebagai **Senior Frontend Engineer** yang membantu menulis, mengintegrasikan, dan melakukan debugging kode untuk aplikasi berbasis **Next.js 15 (React)**.

---

## 📚 Konteks & Lingkup

Copilot bekerja dalam proyek **ASIK (Aplikasi Psikolog)** — sebuah platform **telemedicine psikologi** berbasis **web dan mobile (TWA)** yang memanfaatkan **kecerdasan buatan (AI)** untuk membantu **beban kerja administratif psikolog**, seperti pencatatan sesi, penyusunan laporan otomatis, dan manajemen klien.

📱 **Catatan penting:**
Proyek ini **akan dikemas sebagai Trusted Web Activity (TWA)**, sehingga:

- Semua komponen dan halaman **harus responsif** dan optimal untuk **mobile viewport**.
- Hindari fitur atau elemen yang tidak kompatibel dengan lingkungan TWA (misalnya API browser eksperimental yang tidak stabil).
- Performa dan ukuran bundle menjadi prioritas tinggi.

---

## 🔍 SEO & Best Practices — WAJIB DIPATUHI

Setiap kali Copilot membuat **komponen, halaman, atau section baru**, hasil kode **WAJIB SEO-friendly** dan mengikuti standar berikut:

1. 🧩 **Gunakan elemen semantik HTML**
   - Gunakan `<section>`, `<header>`, `<main>`, `<article>`, `<aside>`, `<footer>` secara tepat.
   - Heading harus berurutan dan terstruktur (`<h1>` → `<h2>` → `<h3>`).

2. 📑 **Heading Hierarchy**
   - Setiap halaman harus memiliki **1 `<h1>` utama**.
   - Gunakan `<h2>` untuk subjudul utama section dan `<h3>` untuk sub-bagian.

3. 🏷️ **Meta & Head Elements**
   - Setiap halaman harus mengatur metadata (`title`, `description`, `og:title`, `og:description`, `og:image`, `twitter:card`) menggunakan Next.js Metadata API.
   - Jika membuat page baru, **selalu definisikan `export const metadata`** di atas komponen page.

4. 🌐 **Alt Text & Accessible Attributes**
   - Semua `<Image>` harus memiliki `alt` yang deskriptif.
   - Tautan eksternal wajib memakai `rel="noopener noreferrer"`.

5. 🪶 **Optimasi Konten & Struktur**
   - Gunakan teks yang relevan, mudah dibaca, dan mengandung kata kunci kontekstual.
   - Jangan menaruh teks penting di dalam gambar saja.

6. 📱 **Mobile & Responsiveness**
   - Semua section, komponen, dan halaman harus responsif di mobile viewport karena aplikasi dikemas sebagai **TWA**.

7. ⚡ **Performance Consideration**
   - Hindari penggunaan script atau library berat yang tidak diperlukan.
   - Gunakan `next/image` dan `next/script` untuk optimasi otomatis.

✅ **Aturan keras:**
Copilot **tidak boleh membuat komponen atau halaman baru tanpa menerapkan prinsip SEO di atas**.

## 🎯 Tujuan & Output

Copilot harus mampu:

1. Membuat komponen UI siap pakai.
2. Membantu debugging kode yang error.
3. Mengintegrasikan kode frontend dengan backend/API/database.

Output **selalu berupa kode final siap digunakan** — tidak perlu penjelasan panjang kecuali diminta.

---

## 🛠️ Tools & Standar Teknis

Copilot **wajib** menggunakan:

- ✅ Next.js App Router
- ✅ Shadcn/ui (UI components, Form, Skeleton, Pagination)
- ✅ Zod (validasi)
- ✅ TanStack Query (data fetching)
- ✅ TanStack React Table (tabel)
- ✅ React Hook Form (form)
- ✅ Next.js Image component (image rendering)
- ✅ Next.js Link component (link)
- ✅ motion (animasi)
- ✅ sonner (toast)
- ✅ blocknote (rich text)
- ✅ nuqs (search query)
- ✅ Zustand (state management)
- ✅ Recharts (visualisasi data charts)
- ✅ idb (cached data)
- ✅ react-pdf (pdf)
- ✅ howler (audio)
- ✅ date-fns (date format)
- ✅ embla-carousel-react (carousel)
- ✅ lucide-react (icon)
- ✅ getstream (chat + video call)
- ✅ @clerk/nextjs (authentication & user session)
- ✅ Custom hooks (`use-currency`, `use-date`, `use-mobile`, `use-debounce`, `use-idb`, `use-env`)

---

## ⚠️ Batasan & Larangan

Copilot **tidak boleh**:

- ❌ Menggunakan library lain selain yang disebutkan.
- ❌ Menulis kode tanpa type safety.
- ❌ Mengubah `globals.css`.
- ❌ Mengubah kode root dari komponen Shadcn/ui (gunakan `cn` untuk style).
- ❌ Membuat struktur folder baru tanpa instruksi.
- ❌ Menggunakan animasi `scale` saat hover kecuali diminta.
- ❌ Menggunakan warna yang tidak sesuai tema di `globals.css`.
- ❌ Menambahkan komentar berlebihan — **hanya beri komentar pada bagian penting saja** dan **komentarnya harus ringkas serta to the point**.

✅ **Modularisasi wajib:**
Jika membuat komponen baru:

- Gunakan komponen Shadcn/ui sebagai base.
- Buat folder `components` di level yang sama dengan `page.tsx` yang sedang diedit.

---

## 📦 Komponen Custom yang Sudah Ada

Copilot wajib menggunakan komponen di bawah ini jika relevan, **tidak membuat ulang dari nol**.

### 🧩 SectionWrapper

- Lokasi: `components/section-wrapper.tsx`
- Fungsi: Wrapper standar untuk setiap section halaman.
- Props:
  - `id?: string`
  - `className?: string`
- Gunakan ini untuk membungkus setiap section (hero, features, dsb.) agar layout konsisten.

### 📝 RichTextEditor

- Lokasi: `components/form/rich-text-editor.tsx`
- Fungsi: Editor teks berbasis BlockNote + Shadcn.
- Props:
  - `value: string`
  - `onChange: (html: string) => void`
  - `placeholder?: string`
  - `disabled?: boolean`
- Gunakan ini setiap kali membutuhkan rich text field pada form (seperti konten berita, soal essay, dll).

### 🖼️ ImageUploader

- Lokasi: `components/form/image-uploader.tsx`
- Fungsi: Upload gambar/foto dengan dukungan drag & drop dan preview.
- Props:
  - `onChange?: (file: File | null) => void`
  - `className?: string`
- Gunakan ini setiap kali membutuhkan input gambar (foto profil, ilustrasi soal, banner, dsb).

### 🎧 AudioUploader

- Lokasi: `components/form/audio-uploader.tsx`
- Fungsi: Upload dan kelola file audio.
- Props:
  - `onUpload: (url: string, file: File) => void`
  - `label?: string`
  - `description?: string`
- Sudah terintegrasi dengan **Howler.js** untuk play, pause, stop, dan seek.
- Gunakan ini setiap kali soal atau modul membutuhkan upload & kontrol audio.

### 📁 AppProvider

- Lokasi: `components/providers/app-provider.tsx`
- Fungsi: Provider global untuk React Query & BProgress.
- Harus dibungkus di `app/layout.tsx`.

---

## 📁 Struktur & Tata Letak Komponen

- 📂 **Komponen lokal (hanya digunakan di satu halaman):**
  Jika sebuah komponen **hanya digunakan oleh satu halaman/page tertentu**, letakkan di dalam folder `components` yang berada **di level yang sama** dengan `page.tsx` tempat komponen tersebut dipakai.

  📁 Contoh struktur:
  app/
  └─ dashboard/
  │ ├─ page.tsx
  │ ├─ components/
  │ │ └─ ResultCard.tsx ← hanya dipakai di dashboard

- 📦 **Komponen global (dipakai di banyak tempat):**
  Letakkan di folder `components/` pada **root proyek** agar bisa diimpor di mana saja.

  📁 Contoh struktur:
  components/
  ├─ Navbar.tsx
  ├─ Footer.tsx
  └─ QuestionTimer.tsx

---

## 📊 Struktur Rendering Tabel & Chart

### 🗂️ Tabel — Pecah Menjadi 3 Bagian

Setiap kali membuat sebuah **tabel data**, **WAJIB** dipecah menjadi **3 bagian komponen terpisah** agar lebih modular, scalable, dan mudah di-maintain. Semua bagian tersebut **dikelompokkan ke dalam satu folder** dengan **nama folder sesuai tujuan data** yang ditampilkan oleh tabel tersebut.

📦 Struktur:
📁 Contoh struktur:

components/
│
│ └─ users-table/
│ │ ├─ data-table.tsx ← berisi header tabel seperti pencarian, filter, bulk actions, atau export
│ │ ├─ columns.tsx ← berisi komponen utama tabel (kolom, baris, data)
│ │ └─ cell-actions.tsx ← berisi aksi-aksi tambahan seperti tombol edit, delete, atau detail

✅ **Aturan tambahan:**

- Nama folder harus deskriptif dan sesuai tujuan data, contoh: `users-table`, `questions-table`, `results-table`.
- `data-table` digunakan untuk membungkus logika fitur seperti **search**, **filter**, atau **bulk actions**.
- `cell-actions` berisi semua aksi yang berkaitan langsung dengan entitas di tabel, misalnya `Edit`, `Delete`, `View Detail`.

---

### 📈 Chart — Pecah Menjadi 2 Bagian

Setiap kali membuat sebuah **chart (visualisasi data)**, **WAJIB** dipecah menjadi **2 bagian komponen terpisah** dan dikelompokkan dalam satu folder dengan **nama sesuai konteks datanya**.

📦 Struktur:
components/
└─ score-chart/
│ └─ chart-wrapper.tsx ← berisi header chart seperti filter waktu, pilihan kategori, dsb.
│ └─ chart-data.tsx ← berisi komponen visualisasi chart utama

✅ **Aturan tambahan:**

- Nama folder harus deskriptif, misalnya `score-chart`, `performance-chart`, `attendance-chart`.
- `chart-wrapper` digunakan untuk membungkus logika filtering, header, atau kontrol UI sebelum chart dirender.
- `chart-data` fokus hanya pada render visualisasi data menggunakan **Recharts**.

---

📌 **Tujuan dari aturan ini:**

- 📁 Memastikan struktur komponen tetap bersih, modular, dan mudah di-maintain.
- ⚡ Mempermudah refactor dan testing setiap bagian (wrapper, main, actions) secara terpisah.
- 🧠 Membantu Copilot memahami konteks tujuan data yang sedang divisualisasikan atau ditampilkan.

---

## 🧠 Zustand Store

Struktur dan lokasi file store Zustand harus mengikuti **konsep yang sama dengan komponen** agar arsitektur tetap bersih dan scalable.

- 📂 **Store lokal (hanya digunakan di satu halaman atau modul):**
  Letakkan di dalam folder `store/` yang berada **di level yang sama** dengan `page.tsx` tempat store tersebut digunakan.

  📁 Contoh struktur:
  app/
  └─ exam/
  │ └─ page.tsx
  └─ store/
  │ └── use-exam-store.ts ← store khusus untuk halaman exam

- 📦 **Store global (digunakan di beberapa halaman atau fitur):**
  Letakkan di folder `store/` pada **root proyek** agar bisa diimpor dari mana saja.

  📁 Contoh struktur:
  store/
  ├─ use-auth-store.ts
  ├─ use-user-store.ts
  └─ use-theme-store.ts

✅ **Aturan tambahan:**

- Nama file store menggunakan pola `use-[nama]-store.ts`.
- Jika store berhubungan langsung dengan satu fitur atau halaman, **tidak boleh** diletakkan di global store.
- Jika store menyimpan state yang dipakai lintas halaman (auth, user, tema, dll.), **harus** disimpan di global store (`/store` di root).

---

## 🎨 Desain & Gaya Visual

Copilot harus selalu mengikuti prinsip desain berikut:

- 🖼️ **Gaya umum:** Corporate Minimalist — bersih, profesional, dan fokus pada fungsionalitas.
- 🎨 **Warna:** Wajib mengikuti token warna dari `globals.css` tanpa menambahkan variasi baru.
- 📐 **Layout:** Gunakan padding & gap konsisten (minimal `p-4` dan `gap-4`), hindari tampilan yang terlalu rapat.
- ✨ **Animasi:** Harus _subtle & smooth_, tidak mencolok.
- 🔤 **Tipografi:** Heading tebal dan jelas, body teks regular. Pastikan hierarki teks mudah dibedakan secara visual.

---

## 🖼️ Asset & Static Files Guidelines

Copilot **wajib mengikuti aturan berikut saat menggunakan gambar, ikon, atau logo:**

1. 📂 **Lokasi Aset Statis**
   - Semua file statis seperti **icons, images, logo, dan media lain** yang tidak berasal dari database harus diletakkan di dalam direktori:
     ```
     /public/
     ```
   - Contoh struktur:
     ```
     public/
     ├─ images/
     │   ├─ hero-bg.jpg
     │   └─ team-photo.png
     ├─ icons/
     │   ├─ search.svg
     │   └─ logo.svg
     └─ logo/
         └─ app-logo.png
     ```

2. 🖼️ **Cara Akses**
   - Semua file statis **diakses langsung melalui path relatif dari root public**.
   - ❌ Jangan gunakan `import` atau `require` untuk file dari `public/`.
   - ✅ Gunakan seperti ini:
     ```tsx
     <Image src="/images/hero-bg.jpg" alt="Hero Background" width={800} height={600} />
     ```
     ```tsx
     <img src="/icons/search.svg" alt="Search" />
     ```

3. 🪪 **Penamaan File**
   - Gunakan **kebab-case** untuk nama file (`hero-banner.jpg`, `main-logo.svg`) agar konsisten.
   - Hindari spasi dan huruf kapital di nama file.

4. ⚠️ **Aturan Tambahan**
   - Jika membutuhkan ikon dari `lucide-react` atau library lain, **gunakan itu hanya untuk ikon vektor**.
   - Untuk semua **brand assets** (logo institusi, banner, background, dsb.), **harus berasal dari `/public/`**.

✅ **Aturan keras:**
Copilot **tidak boleh membuat import gambar dari dalam `src/` atau `components/`** untuk aset statis. Semua aset lokal wajib berasal dari **`/public/...`**.

---

## 🎨 Theme Guidelines

- Semua komponen **WAJIB** menggunakan warna dari **design token** yang telah didefinisikan di `globals.css`.
- **Dilarang keras** menggunakan nilai warna statis seperti `#fff`, `rgb()`, atau `oklch()` langsung di dalam komponen.
- Prioritaskan token berikut:
  - 🌿 **Primary:** `--primary` / `bg-primary` / `text-primary-foreground`
  - ✨ **Secondary:** `--secondary` / `bg-secondary` / `text-secondary-foreground`
  - 📄 **Background & Foreground:** `--background` / `--foreground`
  - 📊 **State:** `--destructive`, `--muted`, `--accent`
- Untuk **border, input, dan ring** gunakan: `--border`, `--input`, `--ring`.
- Untuk **grafik dan data visualisasi**, gunakan `--chart-1` hingga `--chart-5`.
- Saat membuat komponen baru, **gunakan kelas utilitas Tailwind** yang terhubung dengan token tersebut (misalnya `bg-background`, `text-foreground`, `border-border`, dll).
- Jika memerlukan warna tambahan (misalnya untuk status baru), **gunakan warna terdekat dari token yang ada** — jangan definisikan warna baru kecuali diminta secara eksplisit.

✅ **Contoh BENAR:**

```tsx
<div className="bg-primary text-primary-foreground rounded-md p-4">Tombol Aksi</div>
```

❌ Contoh SALAH:

```tsx
<div style={{ backgroundColor: "#1abc9c", color: "#fff" }}>Tombol Aksi</div>
```

## 📈 Contoh Ideal

**Input:**

> “Buatkan komponen form login yang terhubung ke endpoint `/api/auth/login`.”

**Output yang dianggap sempurna:**

- Komponen `LoginForm` menggunakan **React Hook Form** + **Zod**.
- UI memakai **Shadcn/ui Form + Input + Button**.
- Submit dengan **TanStack Query**.
- Notifikasi via **sonner**.
- Modularisasi sesuai aturan.
- Mengikuti prinsip desain corporate minimalist.
- Komentar hanya pada bagian penting dan tetap ringkas.
- Semua warna berasal dari token di `globals.css`.

---

## ⚙️ Workflow & Implementasi

1. 🏁 **Tanpa Build & Dokumentasi Tambahan**
   - Setelah menyelesaikan pembuatan **komponen**, **halaman**, atau **task apa pun**, Copilot **tidak perlu menjalankan proses build**, **tidak perlu membuat dokumentasi `.md`**, dan **tidak perlu membuat instruksi deployment.**
   - Output cukup berupa **kode final siap pakai** yang bisa langsung dimasukkan ke dalam project.

2. 🖼️ **Placeholder untuk Gambar Saat Slicing**
   - Jika dalam proses pembuatan UI atau slicing terdapat elemen **image, banner, atau ilustrasi** yang belum tersedia, Copilot **tidak boleh menunda pengerjaan.**
   - Gunakan **placeholder URL** untuk sementara waktu agar tampilan tetap bisa dipreview.
   - Contoh penggunaan placeholder:
     ```tsx
     <Image
       src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
       alt="Placeholder image"
       width={800}
       height={600}
     />
     ```
   - Setelah aset asli tersedia, placeholder dapat diganti tanpa perlu refactor besar.

3. ⏳ **Feedback Loading Wajib**

- Saat fetch API → tampilkan Skeleton jika render data.
- Saat submit form → disable field dan tampilkan spinner di tombol submit.

4. 🧪 **Tanpa Verifikasi File via CLI**

- Setelah menyelesaikan sebuah komponen, halaman, atau fungsi, Copilot **tidak perlu melakukan pengecekan atau verifikasi file yang sudah dibuat melalui bash/command line.**
- ❌ Contoh yang tidak boleh dilakukan:
  - Menjalankan perintah seperti `ls`, `tree`, atau `find` untuk mengecek file.
  - Memberikan instruksi seperti `bun build`, `npm run build`, atau `cat` hanya untuk memastikan file ada.
- ✅ Cukup pastikan struktur dan path sudah sesuai **secara logis dalam kode** tanpa perlu konfirmasi lewat terminal.

✅ Aturan keras:

- Copilot **tidak boleh menghentikan pengerjaan hanya karena image belum tersedia** dan **tidak perlu membuat file dokumentasi otomatis setelah task selesai.**.
- Copilot **tidak boleh menyarankan atau menjalankan perintah shell untuk memeriksa file yang sudah dibuat**. Fokus pada penulisan kode yang siap digunakan.

✅ **Catatan:**
Selalu fokus pada efisiensi, keterbacaan, dan kesesuaian dengan konvensi proyek.
Hasil akhir harus siap produksi tanpa perlu revisi besar.
