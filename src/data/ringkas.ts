import type { Ringkas } from '../types';

/* Ringkasan visual Bab III — disusun dari modul guru. Teks mendukung **tebal**. */
export const RINGKAS: Ringkas[] = [
  {
    chapter: 3, phase: 'Perjuangan fisik dan diplomasi', tone: 'red', icon: 'swords',
    tagline: 'Sekutu datang membawa NICA → rakyat melawan di berbagai daerah → Belanda dua kali agresi → Indonesia berunding sampai kedaulatan diakui 27 Desember 1949.',
    pertanyaan: 'Bagaimana perlawanan bersenjata dan perundingan saling menopang sampai Belanda mengakui kedaulatan Indonesia?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'ship', title: 'Sekutu membawa NICA', text: '**AFNEI** tiba 29 Sep 1945 untuk urusan pascaperang, tetapi ikut membawa **NICA** yang ingin mengembalikan kekuasaan Belanda.' },
        { icon: 'swords', title: 'Perjuangan fisik', text: 'Perlawanan di **Surabaya, Medan, Ambarawa, Bandung, Semarang**, lalu menghadapi **Agresi Militer I dan II** dengan perang gerilya.' },
        { icon: 'handshake', title: 'Perjuangan diplomasi', text: '**Linggarjati → Renville → Roem-Royen → KII → KMB**, berujung pada pengakuan kedaulatan **27 Desember 1949**.' },
      ]},
      { type: 'vs', title: 'Dua jalur, satu tujuan', a: { label: 'Perjuangan fisik', tone: 'red' }, b: { label: 'Perjuangan diplomasi', tone: 'blue' }, rows: [
        { aspect: 'Cara', a: 'Angkat senjata, gerilya, bumi hangus', b: 'Perundingan, dukungan PBB dan negara sahabat' },
        { aspect: 'Contoh', a: 'Surabaya, Ambarawa, Bandung Lautan Api, gerilya Agresi II', b: 'Linggarjati, Renville, Roem-Royen, KII, KMB' },
        { aspect: 'Hasil', a: 'Membuktikan RI dan TNI **masih ada**', b: 'Pengakuan de facto, lalu **pengakuan kedaulatan**' },
      ]},
      { type: 'list', title: 'Lima tugas AFNEI', ordered: true, items: [
        'Menerima penyerahan Jepang',
        'Membebaskan tawanan perang asal Eropa',
        'Melucuti dan memulangkan tentara Jepang',
        'Menjaga keadaan damai sampai diserahkan ke pemerintah sipil',
        'Mencari dan mengadili penjahat perang Jepang',
      ]},
      { type: 'grid', title: 'Perlawanan di berbagai daerah', items: [
        { title: 'Surabaya', meta: '27 Okt – 20 Nov 1945', text: 'Insiden Yamato, Mallaby tewas, ultimatum Mansergh. Puncak **10 November** (Hari Pahlawan).', tag: 'Sekutu', tone: 'red', icon: 'radio' },
        { title: 'Semarang', meta: '15 – 19 Okt 1945', text: 'Melawan **Jepang**. Isu racun di tandon Siranda, **dr. Kariadi** gugur. Monumen **Tugu Muda**.', tag: 'Jepang', tone: 'amber', icon: 'flame' },
        { title: 'Medan Area', meta: '13 Okt 1945', text: 'Lencana Merah Putih diinjak di **Pension Wilhelmina** (markas bekas KNIL pimpinan Westerling).', tag: 'Sekutu', tone: 'red', icon: 'flag' },
        { title: 'Ambarawa', meta: 'Des 1945', text: 'Kol. **Soedirman** dengan taktik **supit urang**. Letkol Isdiman gugur.', tag: 'Sekutu', tone: 'red', icon: 'compass' },
        { title: 'Bandung Lautan Api', meta: '23 – 24 Mar 1946', text: 'Ultimatum kosongkan 11 km. Bandung Selatan dibakar dari Cicadas sampai Andir, **±1 juta** mengungsi.', tag: 'Sekutu', tone: 'red', icon: 'flame' },
        { title: 'Pasukan Aceh di Medan', meta: '1946 – 1947', text: 'Divisi Gajah I dan II. **Pangkalan Berandan** dibumihanguskan, mundur ke Tanjung Pura lalu Gebang.', tag: 'Belanda', tone: 'violet', icon: 'swords' },
        { title: 'Agresi Militer I', meta: '21 Jul – 5 Agu 1947', text: '**Operatie Product**, mengincar perkebunan dan minyak. Hasilnya masuk DK PBB dan lahir **KTN**.', tag: 'Belanda', tone: 'violet', icon: 'bomb' },
        { title: 'Agresi Militer II', meta: '19 Des 1948', text: '**Operatie Kraai**. Maguwo dibom, Yogya jatuh, pemimpin diasingkan, lahir **PDRI**. KTN diganti **UNCI**.', tag: 'Belanda', tone: 'violet', icon: 'bomb' },
      ]},
      { type: 'table', title: 'Rangkuman perundingan', head: ['Perundingan', 'Waktu & tempat', 'Tokoh kunci', 'Isi pokok'], rows: [
        ['**Linggarjati**', '11–15 Nov 1946 (ditandatangani 25 Mar 1947), Kuningan', 'Sjahrir vs Schermerhorn. Penengah: Lord Killearn', 'De facto RI atas **Jawa, Sumatra, Madura**. RIS dan Uni Indonesia-Belanda'],
        ['**Renville**', '17 Jan 1948, kapal USS Renville', 'Amir Syarifuddin vs Abdulkadir Wijoyoatmojo. Penengah: KTN', 'RI tinggal **Jawa Tengah, Yogyakarta, Sumatra**. **Garis Van Mook**'],
        ['**Roem-Royen**', '7 Mei 1949, Hotel Des Indes', 'Moh. Roem vs van Roijen. Penengah: Merle Cochran (UNCI)', 'Gerilya dihentikan, pemerintah RI kembali ke Yogyakarta, ikut KMB'],
        ['**Inter-Indonesia**', 'I: 19–22 Jul 1949 Yogya. II: 31 Jul–3 Agu 1949 Jakarta', 'RI dan BFO, dipimpin Hatta', 'Sepakat RIS, APRIS, simbol negara'],
        ['**KMB**', '23 Agu–2 Nov 1949, Den Haag', 'Hatta, van Maarseveen, Sultan Hamid II (BFO)', 'Kedaulatan ke RIS, 16 negara bagian, utang 4,3 miliar gulden, Irian ditunda'],
      ]},
      { type: 'alur', title: 'Jalan menuju pengakuan kedaulatan', steps: [
        { label: 'Agresi I', text: 'Masuk DK PBB, lahir KTN' },
        { label: 'Renville', text: 'Wilayah RI menyempit' },
        { label: 'Agresi II', text: 'PDRI dan gerilya, KTN jadi UNCI' },
        { label: 'Roem-Royen', text: 'Pemerintah kembali ke Yogya' },
        { label: 'KII dan KMB', text: 'Sikap disatukan, kedaulatan diakui' },
      ]},
      { type: 'tokoh', title: 'Tokoh yang perlu dikenal', items: [
        { name: 'Bung Tomo', role: 'Orator Pertempuran Surabaya lewat radio', tag: 'Surabaya' },
        { name: 'Brigjen A.W.S. Mallaby', role: 'Pemimpin AFNEI di Surabaya, tewas 30 Okt 1945', tag: 'Sekutu' },
        { name: 'Kolonel Soedirman', role: 'Taktik supit urang di Ambarawa, memimpin gerilya Agresi II', tag: 'Ambarawa' },
        { name: 'A.H. Nasution', role: 'Komandan Divisi III Siliwangi, perintah bumi hangus Bandung', tag: 'Bandung' },
        { name: 'Mohammad Toha', role: 'Meledakkan gudang amunisi di Dayeuhkolot', tag: 'Bandung' },
        { name: 'Achmad Tahir', role: 'Pemimpin barisan pemuda Medan', tag: 'Medan' },
        { name: 'dr. Kariadi', role: 'Gugur saat memeriksa tandon air Siranda', tag: 'Semarang' },
        { name: 'Sjafruddin Prawiranegara', role: 'Ketua PDRI di Bukittinggi, 22 Des 1948', tag: 'PDRI' },
        { name: 'Sutan Sjahrir', role: 'Ketua delegasi Linggarjati, pidato di DK PBB 14 Agu 1947', tag: 'Diplomasi' },
        { name: 'Amir Syarifuddin', role: 'Ketua delegasi Renville', tag: 'Diplomasi' },
        { name: 'Mohammad Roem', role: 'Ketua delegasi Roem-Royen', tag: 'Diplomasi' },
        { name: 'Mohammad Hatta', role: 'Memimpin KII dan delegasi KMB, menandatangani di Amsterdam', tag: 'Diplomasi' },
        { name: 'Sri Sultan HB IX', role: 'Menandatangani pengakuan kedaulatan di Jakarta', tag: 'Diplomasi' },
      ]},
      { type: 'ingat', items: [
        'Wilayah **Linggarjati** = Jawa, Sumatra, Madura. Wilayah **Renville** = Jawa Tengah, Yogyakarta, Sumatra.',
        '**KTN**: Australia (pilihan RI), Belgia (pilihan Belanda), Amerika Serikat (pilihan bersama).',
        'Agresi I = **Operatie Product**. Agresi II = **Operatie Kraai**.',
        '27 Des 1949: **Hatta** di Amsterdam, **Sri Sultan HB IX** di Jakarta.',
      ]},
      { type: 'jebakan', items: [
        'Pertempuran **Semarang** melawan **Jepang**, bukan Sekutu.',
        '**Hotel Yamato** ada di Surabaya (insiden bendera). **Hotel Des Indes** ada di Jakarta (Roem-Royen).',
        '**KTN** memediasi Renville. **UNCI** menggantikan KTN dan mengawasi Roem-Royen serta KMB.',
        'Ketua delegasi KMB adalah **Hatta**. **Sultan Hamid II** memimpin delegasi BFO.',
      ]},
      { type: 'jembatan', items: [
        'Urutan perundingan: **L-R-R-K-K** (Linggarjati, Renville, Roem-Royen, KII, KMB).',
        'Linggarjati itu **"JSM"** (Jawa, Sumatra, Madura). Renville tinggal **"Jateng, Yogya, Sumatra"**.',
      ]},
      { type: 'note', title: 'Angka yang perlu diperhatikan', items: [
        'Modul menulis Ambarawa dipukul mundur **14 Des 1945**. Banyak buku menulis **15 Des 1945** (Hari Juang Kartika).',
        'Di bagian pasukan Aceh, modul menulis Clash I **21 April 1947**. Agresi Militer I dimulai **21 Juli 1947**.',
      ]},
    ],
  },
];

export const ringkasFor = (n: number): Ringkas | undefined => RINGKAS.find(r => r.chapter === n);
