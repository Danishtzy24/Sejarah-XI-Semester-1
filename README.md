# Bab III: Strategi Mempertahankan Kemerdekaan

Website belajar Sejarah Indonesia Kelas XI, khusus Bab III (Vite + TypeScript, tanpa framework). Isi mengikuti modul guru "Strategi Mempertahankan Kemerdekaan". Semua ikon berupa SVG inline, tanpa emoji.

## Isi
- **Beranda**: peta konsep dua jalur (fisik dan diplomasi), daftar subbab per bagian, tanggal penting, dan alat belajar.
- **Bab III, 3 tab**
  - **Ringkas**: poin inti, perbandingan dua jalur, tugas AFNEI, perlawanan di berbagai daerah, tabel perundingan, alur menuju pengakuan kedaulatan, tokoh, dan catatan hafalan.
  - **Materi**: 16 subbab.
    - A. Perjuangan fisik: kedatangan Sekutu dan NICA, Surabaya, pasukan Aceh, Ambarawa, Medan Area, Bandung Lautan Api, Semarang, Agresi Militer I dan II.
    - B. Perjuangan diplomasi: alasan diplomasi, Linggarjati, Renville, Roem-Royen, Konferensi Inter-Indonesia, KMB, dan pengakuan kedaulatan.
  - **Latihan**: soal asesmen modul dalam tiga paket, yaitu perjuangan bersenjata, perjuangan diplomasi (termasuk 3 uraian), dan campuran acak.
- **Timeline**, **peta**, dan **kartu hafalan**, semuanya berisi peristiwa, tokoh, dan istilah Bab III saja.
- **Asesmen**: paket soal yang sama dalam satu halaman.
- Pencarian cepat (Ctrl K atau `/`) dan mode gelap. Tidak ada pelacakan progres.

## Catatan soal
Modul tidak menyertakan kunci pilihan ganda, jadi kunci dan pembahasan disusun dari isi materi. Penyesuaian yang dilakukan:
- Soal yang sama persis tidak diulang (diplomasi no. 25, 26, 44, 48, 49, 51).
- Soal bergambar ditulis ulang supaya bisa dijawab tanpa gambar. Soal peta (diplomasi no. 39) memakai gambar dari modul.
- Pilihan jawaban yang keliru atau rusak diperbaiki (bersenjata no. 15, diplomasi no. 31, 43, 45).
- Soal pilihan jamak diubah menjadi pilihan kombinasi (bersenjata no. 12, diplomasi no. 11 dan 47).

## Struktur data
| File | Isi |
|---|---|
| `src/data/course.ts` | Materi Bab III (16 subbab) |
| `src/data/soal.ts` | Soal asesmen beserta kunci dan pembahasan |
| `src/data/ringkas.ts` | Ringkasan visual (teks mendukung `**tebal**`) |
| `src/data/atlas.ts` | Timeline, kartu hafalan, titik peta |
| `src/map.ts` | Peta Indonesia (Natural Earth 1:50m, domain publik) |

## Perintah
```bash
npm install
npm run dev      # pengembangan
npm run build    # typecheck + build ke dist/
```
