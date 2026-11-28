# Sejarah Indonesia — Kelas XI · Semester 1

Website belajar interaktif (Vite + TypeScript, tanpa framework). Semua ikon berupa SVG inline, tanpa emoji.

## Fitur
- **Beranda**: gambaran besar 4 babak sejarah, daftar 8 bab per babak, cara belajar 3 langkah, momen penting, dan alat belajar.
- **Per bab: 3 tab**
  - **Ringkas**: ringkasan visual berisi 3 poin inti, garis waktu, alur sebab-akibat, tabel, perbandingan, kartu tokoh, "Wajib ingat", "Awas tertukar", dan jembatan keledai.
  - **Materi**: materi lengkap per subbab (diperkaya dengan kotak inti, jebakan soal, dan pendalaman dari modul guru) dengan daftar isi.
  - **Latihan**: pilihan ganda dan benar/salah dikoreksi langsung beserta pembahasan; uraian dengan kunci jawaban dan penilaian diri.
- **Timeline** 38 peristiwa, **peta interaktif** 19 lokasi, **kartu hafalan** 77 kartu, **ujian semester** 25 soal, serta **tabel dan glosarium**.
- Pencarian cepat (Ctrl K atau `/`) dan mode gelap. Tidak ada pelacakan progres; hanya pilihan tema yang disimpan (`sejarah-xi-v2`).

## Struktur data
| File | Isi |
|---|---|
| `src/data/course.ts` | Materi lengkap + 113 soal (DIGENERATE oleh `tools/build_course.py` dari `tools/course-source.json` + `tools/enrich.py`) |
| `src/data/ringkas.ts` | Ringkasan visual per bab (blok-blok, teks mendukung `**tebal**`) |
| `src/data/atlas.ts` | Babak, timeline, kartu hafalan, titik peta |
| `src/map.ts` | Peta Indonesia (Natural Earth 1:50m, domain publik) |
| `src/lib.ts` | Helper + set ikon SVG |

## Perintah
```bash
npm install
npm run dev      # pengembangan
npm run build    # typecheck + build ke dist/
python3 tools/build_course.py   # regenerasi src/data/course.ts
```
