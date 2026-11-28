import type { Question } from '../types';

/* Data pendukung halaman Materi:
   - SEKILAS: fakta inti tiap subbab (kapan, di mana, pihak, tokoh, hasil), diambil dari isi materi.
   - CEK: soal singkat di akhir subbab. Sebagian besar diambil dari bank soal asesmen modul;
     subbab yang tidak punya soal di modul diberi satu soal tambahan yang disusun dari materinya. */

export interface Sekilas { kapan: string; dimana: string; pihak: string; tokoh: string[]; hasil: string; }

export const SEKILAS: Record<string, Sekilas> = {
  a0: { kapan: '29 September 1945', dimana: 'Jakarta, lalu Jawa dan Sumatra', pihak: 'AFNEI (Inggris), membawa NICA', tokoh: ['Lord Louis Mountbatten', 'Sir Philip Christison'], hasil: 'NICA memicu insiden dan pertempuran di banyak daerah.' },
  a1: { kapan: '27 Okt – 20 Nov 1945, puncak 10 November', dimana: 'Surabaya (Hotel Yamato, Jembatan Merah)', pihak: 'Rakyat Surabaya melawan Inggris dan NICA', tokoh: ['Bung Tomo', 'Brigjen Mallaby', 'Mayjen Mansergh'], hasil: 'Kota dikuasai Sekutu, tetapi tekad RI terbukti. 10 November menjadi Hari Pahlawan.' },
  a2: { kapan: '1946 – 1947', dimana: 'Medan Area, Pangkalan Berandan, Gebang', pihak: 'Divisi Gajah I dan II melawan Belanda', tokoh: ['Kolonel Simbolon', 'Teuku Nyak Arief'], hasil: 'Pangkalan Berandan dibumihanguskan, pasukan mundur ke Gebang.' },
  a3: { kapan: 'Desember 1945 (modul: 14 Des)', dimana: 'Ambarawa dan Magelang', pihak: 'TKR melawan Inggris (Sekutu)', tokoh: ['Kolonel Soedirman', 'Letkol Isdiman'], hasil: 'Sekutu terpukul mundur lewat taktik supit urang (Palagan Ambarawa).' },
  a4: { kapan: '13 Oktober 1945', dimana: 'Medan, Pension Wilhelmina (Jalan Bali)', pihak: 'Rakyat melawan bekas KNIL dan NICA', tokoh: ['Achmad Tahir', 'Westerling (pihak lawan)'], hasil: 'Bentrok reda setelah Sekutu berjanji memindahkan orang Ambon.' },
  a5: { kapan: '23 – 24 Maret 1946', dimana: 'Bandung Selatan (Cicadas sampai Andir)', pihak: 'Rakyat dan TRI melawan Inggris dan NICA', tokoh: ['A.H. Nasution', 'Mohammad Toha', 'Ismail Marzuki'], hasil: 'Bandung Selatan dibakar, sekitar satu juta penduduk mengungsi.' },
  a6: { kapan: '15 – 19 Oktober 1945', dimana: 'Semarang (Simpang Lima, Tugu Muda)', pihak: 'Pemuda, BKR, Polisi Istimewa melawan Jepang', tokoh: ['dr. Kariadi', 'Mayjen Nakamura (pihak lawan)'], hasil: 'Sekitar 2.000 pejuang gugur. Dikenang lewat Tugu Muda (1953).' },
  a7: { kapan: '21 Juli – 5 Agustus 1947', dimana: 'Jawa dan Sumatra', pihak: 'Belanda (Operatie Product) melawan RI', tokoh: ['Jenderal Soedirman', 'Sutan Sjahrir'], hasil: 'Masalah Indonesia masuk DK PBB dan lahir Komisi Tiga Negara (KTN).' },
  a8: { kapan: '19 Des 1948 – 5 Jan 1949', dimana: 'Yogyakarta (Maguwo), PDRI di Bukittinggi', pihak: 'Belanda (Operatie Kraai) melawan RI', tokoh: ['Sjafruddin Prawiranegara', 'Jenderal Soedirman', 'Simon Spoor (pihak lawan)'], hasil: 'PDRI berdiri, dunia mengecam, KTN diganti UNCI.' },
  b0: { kapan: '1946 – 1949', dimana: 'Forum PBB dan meja perundingan', pihak: 'RI dan Belanda, diprakarsai Inggris', tokoh: ['Sutan Sjahrir', 'Mohammad Hatta'], hasil: 'Dukungan dan simpati internasional untuk Indonesia.' },
  b1: { kapan: 'Runding 11 – 15 Nov 1946, ditandatangani 25 Mar 1947', dimana: 'Linggarjati, Kuningan, Jawa Barat', pihak: 'Penengah: Lord Killearn (Inggris)', tokoh: ['Sutan Sjahrir', 'Wim Schermerhorn'], hasil: 'Pengakuan de facto atas Jawa, Sumatra, dan Madura.' },
  b2: { kapan: '17 Januari 1948', dimana: 'Kapal USS Renville, Teluk Jakarta', pihak: 'Penengah: KTN (AS, Australia, Belgia)', tokoh: ['Amir Syarifuddin', 'Abdulkadir Wijoyoatmojo'], hasil: 'Wilayah RI tinggal Jawa Tengah, Yogyakarta, Sumatra. Ada Garis Van Mook.' },
  b3: { kapan: '7 Mei 1949', dimana: 'Hotel Des Indes, Jakarta', pihak: 'Penengah: UNCI (Merle Cochran)', tokoh: ['Mohammad Roem', 'J.H. van Roijen'], hasil: 'Gerilya dihentikan, pemerintah RI kembali ke Yogyakarta.' },
  b4: { kapan: '19 – 22 Jul dan 31 Jul – 3 Agu 1949', dimana: 'Yogyakarta dan Jakarta', pihak: 'RI dan BFO', tokoh: ['Mohammad Hatta'], hasil: 'Sepakat membentuk RIS, APRIS, dan simbol negara.' },
  b5: { kapan: '23 Agustus – 2 November 1949', dimana: 'Den Haag, Belanda', pihak: 'RI, Belanda, BFO; penengah UNCI', tokoh: ['Mohammad Hatta', 'Van Maarseveen', 'Sultan Hamid II'], hasil: 'Kedaulatan diserahkan kepada RIS, Irian Barat ditunda.' },
  b6: { kapan: '27 Desember 1949', dimana: 'Amsterdam dan Jakarta', pihak: 'Belanda dan RIS', tokoh: ['Mohammad Hatta', 'Sri Sultan Hamengku Buwono IX'], hasil: 'Kedaulatan diakui. Pengakuan penuh atas 17 Agustus 1945 baru pada 2023.' },
};

const L = 'ABCD';
const C = (sec: string, prompt: string, opts: string[], correct: string, explanation: string): Question => ({
  id: `c-${sec}`, chapter: 3, set: sec.startsWith('a') ? 'fisik' : 'diplomasi', no: 0, prompt, kind: 'mcq',
  options: opts.map((t, i) => ({ id: L[i], html: t.replace(/&/g, '&amp;').replace(/</g, '&lt;'), text: t })),
  correct, explanation,
});

/* soal tambahan untuk subbab yang tidak punya soal di modul */
export const CEK_EXTRA: Question[] = [
  C('a2', 'Saat Clash I, agar daerah minyak tidak jatuh ke tangan Belanda, pasukan RI membumihanguskan...',
    ['Tanjung Pura', 'Pangkalan Berandan', 'Gebang', 'Tandem Hilir'], 'B',
    'Pangkalan Berandan adalah daerah minyak. Pasukan RI membakarnya sebelum mundur ke Tanjung Pura, lalu ke Gebang.'),
  C('a4', 'Pertempuran Medan Area bermula di Pension Wilhelmina pada 13 Oktober 1945. Pemicunya adalah...',
    ['Sekutu menuntut kota dikosongkan sejauh 11 km', 'Jepang menolak menyerahkan senjata', 'Seorang pengawal menginjak-injak lencana Merah Putih milik anak Indonesia', 'Bendera Belanda dikibarkan di atas hotel'], 'C',
    'Kabar penghinaan lencana Merah Putih di markas bekas KNIL pimpinan Westerling membuat massa berkumpul dan bentrok.'),
  C('a5', 'Rakyat membumihanguskan Bandung Selatan pada 23 – 24 Maret 1946 karena...',
    ['Sekutu menuntut pengosongan kota sejauh 11 km', 'Jepang meracuni sumber air warga', 'Belanda melancarkan Operatie Product', 'Mallaby tewas di Jembatan Merah'], 'A',
    'Bandung Utara sudah dikosongkan, tetapi Sekutu menuntut pengosongan sejauh 11 km. Rakyat memilih membakar Bandung Selatan daripada menyerahkannya.'),
  C('a6', 'Berbeda dengan banyak pertempuran lain, lawan utama rakyat dalam Pertempuran Lima Hari di Semarang adalah...',
    ['Tentara Inggris (AFNEI)', 'Tentara Jepang (Kidobutai)', 'Pasukan NICA dan KNIL', 'Divisi 7 Desember Belanda'], 'B',
    'Pertempuran ini melawan sisa tentara Jepang, dipicu isu racun di tandon Siranda dan gugurnya dr. Kariadi.'),
];

/* id soal per subbab, urut dari yang paling dasar */
export const CEK: Record<string, string[]> = {
  a0: ['f-16'],
  a1: ['f-15', 'f-17'],
  a2: ['c-a2'],
  a3: ['f-2'],
  a4: ['c-a4'],
  a5: ['c-a5'],
  a6: ['c-a6'],
  a7: ['f-19', 'd-2'],
  a8: ['f-5', 'd-9'],
  b0: ['d-3'],
  b1: ['d-15', 'd-31'],
  b2: ['d-16', 'd-37'],
  b3: ['d-17', 'd-32'],
  b4: ['d-40'],
  b5: ['d-19', 'd-41'],
  b6: ['d-45', 'd-46'],
};
