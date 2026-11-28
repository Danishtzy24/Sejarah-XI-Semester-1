import type { Ringkas } from '../types';

/* Ringkasan visual per bab — gabungan materi website + modul guru (Google Drive).
   Teks mendukung **tebal**. */
export const RINGKAS: Ringkas[] = [
  /* ============================ BAB 1 ============================ */
  {
    chapter: 1, phase: 'Menuju Merdeka', tone: 'amber', icon: 'scroll',
    tagline: 'Jepang mulai kalah → menjanjikan kemerdekaan → bangsa Indonesia merumuskan dasar negaranya sendiri.',
    pertanyaan: 'Bagaimana beragam gagasan bisa menjadi satu dasar negara bersama?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'swords', title: 'Jepang terdesak', text: 'Kalah dari Sekutu di Perang Asia Timur Raya, Jepang **menjanjikan kemerdekaan** (7 Sept 1944) demi dukungan rakyat.' },
        { icon: 'landmark', title: 'BPUPKI dibentuk', text: 'Badan yang **menyelidiki & menyiapkan** kemerdekaan. Ketua: **dr. Radjiman Wedyodiningrat**.' },
        { icon: 'handshake', title: 'Kompromi', text: 'Usulan Yamin, Soepomo, Soekarno → dirumuskan **Panitia Sembilan** menjadi **Piagam Jakarta**.' },
      ]},
      { type: 'timeline', title: 'Garis waktu bab ini', items: [
        { date: '7 Sept 1944', title: 'Janji kemerdekaan', text: 'Parlemen Jepang memutuskan Indonesia akan diberi kemerdekaan.' },
        { date: '1 Mar 1945', title: 'Rencana BPUPKI diumumkan' },
        { date: '29 Apr 1945', title: 'BPUPKI dibentuk', text: 'Nama Jepang: Dokuritsu Junbi Cosakai. Diresmikan 28 Mei 1945.' },
        { date: '29 Mei – 1 Jun 1945', title: 'Sidang I BPUPKI', text: 'Membahas **dasar negara**.', hot: true },
        { date: '1 Jun 1945', title: 'Lahirnya istilah Pancasila', text: 'Pidato Soekarno — diperingati Hari Lahir Pancasila.', hot: true },
        { date: '22 Jun 1945', title: 'Piagam Jakarta', text: 'Hasil Panitia Sembilan.' },
        { date: '10 – 17 Jul 1945', title: 'Sidang II BPUPKI', text: 'Membahas **rancangan UUD**, bentuk & wilayah negara.' },
      ]},
      { type: 'table', title: 'Tiga usulan dasar negara (Sidang I)', head: ['Tokoh', 'Tanggal', 'Isi usulan'], rows: [
        ['**Moh. Yamin**', '29 Mei', 'Peri Kebangsaan · Peri Kemanusiaan · Peri Ketuhanan · Peri Kerakyatan · Kesejahteraan Rakyat'],
        ['**Soepomo**', '31 Mei', 'Persatuan · Kekeluargaan · Keseimbangan lahir-batin · Musyawarah · Keadilan rakyat (negara **integralistik**)'],
        ['**Soekarno**', '1 Juni', 'Kebangsaan · Internasionalisme · Mufakat/Demokrasi · Kesejahteraan sosial · Ketuhanan → dinamai **Pancasila**'],
      ]},
      { type: 'alur', title: 'Pancasila Soekarno bisa “diperas”', steps: [
        { label: 'Pancasila', text: '5 sila' },
        { label: 'Trisila', text: 'Sosio-nasionalisme, Sosio-demokrasi, Ketuhanan' },
        { label: 'Ekasila', text: 'Gotong royong' },
      ]},
      { type: 'list', title: 'Isi Piagam Jakarta (22 Juni 1945)', ordered: true, items: [
        'Ketuhanan dengan kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya',
        'Kemanusiaan yang adil dan beradab',
        'Persatuan Indonesia',
        'Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan',
        'Keadilan sosial bagi seluruh rakyat Indonesia',
      ]},
      { type: 'ingat', items: [
        'Pencetus nama **Pancasila** = **Soekarno, 1 Juni 1945**.',
        'Sidang I = **dasar negara** · Sidang II = **rancangan UUD**.',
        'Panitia Sembilan → **Piagam Jakarta** (22 Juni 1945).',
      ]},
      { type: 'note', title: 'Beda angka di buku', items: [
        'Modul guru: BPUPKI **60 anggota**. Buku lain: **62 anggota Indonesia + 7 anggota Jepang** (pengawas tanpa hak suara). Ikuti versi gurumu.',
      ]},
    ],
  },

  /* ============================ BAB 2 ============================ */
  {
    chapter: 2, phase: 'Menuju Merdeka', tone: 'amber', icon: 'hourglass',
    tagline: 'Jepang menyerah → kekosongan kekuasaan → tua & muda berdebat → Rengasdengklok → teks proklamasi dirumuskan.',
    pertanyaan: 'Kenapa proklamasi harus dipercepat, dan bagaimana tua-muda akhirnya sepakat?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'bomb', title: 'Jepang menyerah', text: 'Bom atom **Hiroshima (6/8)** & **Nagasaki (9/8)** → Jepang menyerah **15 Agustus 1945** → **vacuum of power**.' },
        { icon: 'speech', title: 'Tua vs Muda', text: 'Muda: **segera merdeka**. Tua: **hati-hati lewat PPKI**.' },
        { icon: 'pen', title: 'Teks dirumuskan', text: 'Dini hari 17 Agustus di **rumah Laksamana Maeda**, Jl. Imam Bonjol No. 1.' },
      ]},
      { type: 'timeline', title: 'Hari-hari menegangkan', items: [
        { date: '7 Agt 1945', title: 'PPKI dibentuk', text: '21 anggota, pengganti BPUPKI.' },
        { date: '12 Agt 1945', title: 'Pertemuan Dalat (Vietnam)', text: 'Soekarno, Hatta, Radjiman bertemu **Marsekal Terauchi** → dijanjikan merdeka **24 Agustus 1945**.' },
        { date: '14 Agt 1945', title: 'Pemuda mendesak', text: 'Wikana, Darwis, Chaerul Saleh, Sjahrir mendesak Soekarno — ditolak.' },
        { date: '15 Agt 1945', title: 'Jepang menyerah', text: 'Rapat pemuda di **Lembaga Bakteriologi**. Malamnya Wikana & Darwis menemui Soekarno: “Ini leherku…”', hot: true },
        { date: '16 Agt, 04.00', title: 'Rengasdengklok', text: 'Soekarno-Hatta dibawa ke luar kota.', hot: true },
        { date: '16 Agt, 23.30', title: 'Tiba di rumah Maeda', text: 'Perumusan teks proklamasi dimulai.' },
      ]},
      { type: 'vs', title: 'Golongan Muda vs Golongan Tua', a: { label: 'Golongan Muda', tone: 'red' }, b: { label: 'Golongan Tua', tone: 'blue' }, rows: [
        { aspect: 'Sikap', a: 'Revolusioner — proklamasi **secepatnya**', b: 'Hati-hati — proklamasi **dipersiapkan matang**' },
        { aspect: 'PPKI', a: 'Ditolak: dianggap **buatan Jepang**', b: 'Lewat **rapat PPKI** agar sah & teratur' },
        { aspect: 'Alasan', a: 'Manfaatkan **vacuum of power** sebelum Sekutu datang', b: 'Hindari **pertumpahan darah** dengan Jepang yang masih bersenjata' },
        { aspect: 'Tokoh', a: 'Chaerul Saleh, Sukarni, Wikana, Darwis, Adam Malik', b: 'Soekarno, Hatta, Ahmad Soebardjo' },
      ]},
      { type: 'alur', title: 'Rengasdengklok dalam 4 langkah', steps: [
        { label: 'Diculik', text: '16 Agt 04.00 — Soekarno, Hatta, Fatmawati, Guntur dibawa ke rumah **Djiauw Kie Siong**' },
        { label: 'Sepakat', text: 'Di Jakarta, **Ahmad Soebardjo** & **Wikana** sepakat proklamasi di Jakarta' },
        { label: 'Dijemput', text: '**Jusuf Kunto** antar Soebardjo; jaminan proklamasi paling lambat **17 Agt jam 12.00**' },
        { label: 'Kembali', text: 'Tiba di Jakarta ±23.30 → rumah **Laksamana Maeda**' },
      ]},
      { type: 'tokoh', title: 'Siapa berbuat apa saat perumusan teks?', items: [
        { name: 'Soekarno', role: 'Menulis konsep (klad) naskah', tag: 'Penulis' },
        { name: 'Moh. Hatta', role: 'Sumbang gagasan (kalimat kedua)', tag: 'Perumus' },
        { name: 'Ahmad Soebardjo', role: 'Sumbang gagasan (kalimat pertama)', tag: 'Perumus' },
        { name: 'Sayuti Melik', role: 'Mengetik naskah + beberapa perubahan', tag: 'Pengetik' },
        { name: 'Sukarni', role: 'Usul ditandatangani Soekarno-Hatta “atas nama bangsa Indonesia”', tag: 'Pengusul' },
        { name: 'Laksamana Maeda', role: 'Meminjamkan rumah & menjamin keamanan', tag: 'Tuan rumah' },
        { name: 'B.M. Diah', role: 'Menyelamatkan naskah tulisan tangan', tag: 'Penyelamat' },
        { name: 'Satsuki Mishima', role: 'Meminjam mesin ketik **Adler** dari perwira Jerman (Mayor Kandeler)', tag: 'Mesin ketik' },
      ]},
      { type: 'table', title: 'Perubahan saat diketik Sayuti Melik', head: ['Tulisan tangan', '→ Hasil ketikan'], rows: [
        ['“tempoh”', '“**tempo**”'],
        ['“wakil-wakil bangsa Indonesia”', '“**Atas nama bangsa Indonesia**”'],
        ['“Djakarta, 17-8-05”', '“**Djakarta, hari 17 boelan 8 tahoen 05**” (05 = tahun Jepang 2605)'],
      ]},
      { type: 'ingat', items: [
        'Rengasdengklok dipilih karena **markas PETA** — aman dari Jepang.',
        'Tujuan: menjauhkan Soekarno-Hatta dari **pengaruh Jepang** + mendesak segera proklamasi.',
        'Penjamin proklamasi = **Ahmad Soebardjo**.',
      ]},
    ],
  },

  /* ============================ BAB 3 ============================ */
  {
    chapter: 3, phase: 'Menuju Merdeka', tone: 'red', icon: 'flag',
    tagline: 'Jumat, 17 Agustus 1945 — Indonesia menyatakan merdeka, lalu kabarnya disebar diam-diam ke seluruh negeri.',
    pertanyaan: 'Apa arti proklamasi dan bagaimana kabarnya sampai ke seluruh Nusantara?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'pin', title: 'Di mana & kapan', text: 'Jl. **Pegangsaan Timur 56**, Jakarta — Jumat **17 Agustus 1945** pukul 10.00.' },
        { icon: 'mic', title: 'Siapa', text: 'Dibacakan **Soekarno**, didampingi **Hatta**.' },
        { icon: 'radio', title: 'Disebarkan', text: 'Lewat **radio, koran, pamflet, telegram**, dan dari mulut ke mulut — diam-diam karena dilarang Jepang.' },
      ]},
      { type: 'list', title: 'Susunan acara proklamasi', ordered: true, items: [
        '**Pembacaan teks proklamasi** oleh Soekarno, didampingi Hatta',
        '**Pengibaran Merah Putih** oleh **Latief Hendraningrat** & **Suhud** — bendera dijahit **Fatmawati**',
        '**Menyanyikan Indonesia Raya** bersama-sama',
        '**Sambutan** Wali Kota **Soewirjo** dan **dr. Muwardi**',
      ]},
      { type: 'tokoh', title: 'Tokoh di hari proklamasi', items: [
        { name: 'Soekarno', role: 'Membacakan teks proklamasi', tag: 'Proklamator' },
        { name: 'Moh. Hatta', role: 'Mendampingi & ikut menandatangani', tag: 'Proklamator' },
        { name: 'Latief Hendraningrat', role: 'Mengibarkan bendera (bersama Suhud)', tag: 'Pengibar' },
        { name: 'Fatmawati', role: 'Menjahit bendera pusaka', tag: 'Bendera' },
        { name: 'Frans & Alex Mendur', role: 'Memotret momen proklamasi', tag: 'Fotografer' },
        { name: 'dr. Muwardi', role: 'Sambutan & pengamanan (Barisan Pelopor)', tag: 'Keamanan' },
      ]},
      { type: 'grid', title: 'Makna proklamasi', items: [
        { title: 'Politik', text: 'Lahir negara merdeka, bebas dari Belanda & Jepang; berhak **menentukan nasib sendiri**.', tone: 'red' },
        { title: 'Hukum', text: 'Hukum kolonial diganti **hukum nasional**; pernyataan resmi kepada dunia.', tone: 'blue' },
        { title: 'Sejarah & sosial', text: '**Akhir penjajahan**, awal pembangunan; martabat bangsa **sejajar** dengan bangsa lain.', tone: 'green' },
      ]},
      { type: 'grid', title: 'Jalur penyebaran berita', items: [
        { title: 'Radio', icon: 'radio', meta: 'Hoso Kyoku (kini RRI)', text: '**Syahrudin** (Domei) menyelundupkan teks. **Yusuf Ronodipuro** & **Adam Malik** menyiarkan. Di Surabaya pakai **bahasa Madura** agar Jepang tak paham. Pemancar disegel (20 Agt) → pemuda rakit pemancar di **Menteng 31**.' },
        { title: 'Koran & pamflet', icon: 'newspaper', meta: 'Media cetak', text: 'Dimuat harian **Tjahaja** (Bandung) & **Soeara Asia** (Surabaya). Salinan teks ditempel di tempat umum.' },
        { title: 'Telegram & utusan', icon: 'mail', meta: 'Antar-daerah', text: 'Lewat telegraf ke Jawa, Sumatra, Indonesia Timur. **Anggota PPKI** membawa kabar ke daerahnya.' },
        { title: 'Mulut ke mulut', icon: 'speech', meta: 'Rakyat', text: 'Di jalan, pasar, kampung → semangat nasional bangkit cepat.' },
      ]},
      { type: 'ingat', items: [
        'Proklamasi = **puncak perjuangan** & tanda **lahirnya NKRI**.',
        'Proklamasi baru menyatakan merdeka secara **de facto** → masih perlu UUD, presiden, pemerintahan (Bab 4).',
      ]},
    ],
  },

  /* ============================ BAB 4 ============================ */
  {
    chapter: 4, phase: 'Negara Terbentuk', tone: 'teal', icon: 'landmark',
    tagline: 'Sehari setelah merdeka, PPKI langsung bersidang 3 kali untuk melengkapi negara: UUD, presiden, kementerian, provinsi, dan keamanan.',
    pertanyaan: 'Apa saja yang dibutuhkan agar negara baru bisa berjalan?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'book', title: 'Konstitusi', text: '**UUD 1945** disahkan 18 Agustus; Pancasila ada di Pembukaan.' },
        { icon: 'users', title: 'Pemimpin', text: '**Soekarno** Presiden, **Hatta** Wapres — aklamasi atas usul **Otto Iskandardinata**.' },
        { icon: 'map', title: 'Pemerintahan', text: '**12 kementerian + 4 menteri negara**, **8 provinsi**, **KNIP**, dan **BKR**.' },
      ]},
      { type: 'grid', title: 'Hasil 3 sidang PPKI', items: [
        { title: 'Sidang I', meta: '18 Agustus 1945', tag: 'Fondasi', tone: 'red', text: '1) Mengesahkan **UUD 1945**\n2) Memilih **Soekarno & Hatta**\n3) Presiden dibantu **Komite Nasional** sementara' },
        { title: 'Sidang II', meta: '19 Agustus 1945', tag: 'Pemerintahan', tone: 'teal', text: '1) **12 kementerian + 4 menteri negara** (kabinet dilantik 2 Sept)\n2) **8 provinsi**: Sumatra, Jabar, Jateng, Jatim, Sunda Kecil, Maluku, Sulawesi, Kalimantan' },
        { title: 'Sidang III', meta: '22 Agustus 1945', tag: 'Politik & Keamanan', tone: 'blue', text: '1) **KNIP** (pembantu presiden)\n2) **PNI** partai tunggal (batal)\n3) **BKR** → cikal bakal TNI' },
      ]},
      { type: 'alur', title: 'Dari BKR menjadi TNI', steps: [
        { label: 'BKR', text: '22 Agt 1945 — Badan Keamanan Rakyat' },
        { label: 'TKR', text: '5 Okt 1945 — Tentara Keamanan Rakyat (Hari TNI)' },
        { label: 'TRI', text: 'Tentara Republik Indonesia' },
        { label: 'TNI', text: 'Tentara Nasional Indonesia' },
      ]},
      { type: 'list', title: 'Dampak sidang PPKI', items: [
        'Dasar hukum negara: **UUD 1945**',
        'Pemerintahan **sah** — ada presiden, wapres, lembaga negara',
        'Landasan sistem pemerintahan modern Indonesia',
        'Menegaskan **identitas & kedaulatan** di mata dunia',
      ]},
      { type: 'jembatan', items: [
        '**18** = UUD + Presiden · **19** = Kementerian + Provinsi · **22** = KNIP + PNI + BKR',
      ]},
      { type: 'jebakan', items: [
        'Perumusan teks proklamasi **BUKAN** hasil sidang PPKI.',
        'PPKI dibentuk Jepang (7 Agt), tapi setelah Jepang menyerah jadi **badan milik bangsa Indonesia**.',
      ]},
    ],
  },

  /* ============================ BAB 5 ============================ */
  {
    chapter: 5, phase: 'Negara Terbentuk', tone: 'green', icon: 'users',
    tagline: 'Rakyat menyambut merdeka dengan semangat: daerah menyatakan bergabung, rapat raksasa digelar, senjata Jepang direbut.',
    pertanyaan: 'Bagaimana rakyat membuktikan bahwa kemerdekaan adalah kehendak mereka sendiri?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'megaphone', title: 'Komite van Aksi', text: 'Gabungan **API, BARA, BBI**. 2 Sept 1945: manifesto **“Suara Rakyat No. 1”**.' },
        { icon: 'crown', title: 'Sri Sultan HB IX', text: '5 Sept 1945: Yogyakarta **bagian dari RI** → dasar **keistimewaan Yogyakarta**.' },
        { icon: 'users', title: 'Rapat Ikada', text: '19 Sept 1945: ratusan ribu rakyat; pidato Soekarno **±5 menit**, rakyat bubar tertib.' },
      ]},
      { type: 'list', title: 'Isi Amanat Sri Sultan HB IX (5 September 1945)', items: [
        'Ngayogyakarta Hadiningrat (kerajaan) adalah **daerah istimewa** Republik Indonesia',
        'Sultan memegang pemerintahan di Yogyakarta sebagai kepala daerah',
        'Yogyakarta berhubungan **langsung** dengan pusat; Sultan bertanggung jawab **langsung kepada Presiden**',
        'Dibalas **Piagam Kedudukan** dari Presiden Soekarno (19 Sept 1945)',
      ]},
      { type: 'grid', title: 'Rapat Raksasa Ikada — 19 September 1945', items: [
        { title: 'Tempat', text: 'Lapangan Ikada, Jakarta — kini kawasan **Monas**.' },
        { title: 'Tujuan', text: 'Pertemukan pemimpin & rakyat; tunjukkan pada Sekutu/Jepang bahwa merdeka **bukan hadiah Jepang**.' },
        { title: 'Situasi', text: 'Tegang — Jepang mengepung dengan **tank & senapan mesin**.' },
        { title: 'Makna', text: 'Bukti **kewibawaan pemerintah**: rakyat patuh, percaya diri akan kekuatan bangsa sendiri.' },
      ]},
      { type: 'quote', text: 'Kita sudah memproklamasikan Kemerdekaan Indonesia. Proklamasi ini tetap kami pertahankan, sepatah pun tidak kami cabut… Tenang, tenteram, tetapi tetap siap sedia menerima perintah yang kami berikan.', by: 'Soekarno, Rapat Ikada' },
      { type: 'list', title: 'Kenapa senjata Jepang direbut?', ordered: true, items: [
        'Jadi **modal perang** mempertahankan kemerdekaan',
        'Agar **tidak jatuh ke tangan Sekutu**',
        'Agar **tidak dipakai membunuh rakyat**',
      ]},
      { type: 'table', title: 'Aksi heroik melawan Jepang di daerah', head: ['Daerah', 'Waktu', 'Inti peristiwa'], rows: [
        ['**Surabaya**', 'Sept – 1 Okt 1945', 'Rebut gudang mesiu **Don Bosco** & markas **Kempetai**'],
        ['**Yogyakarta**', '26 Sept & 7 Okt 1945', 'Pegawai mogok; rebut tangsi **Otsuka Butai**'],
        ['**Semarang**', '15 – 20 Okt 1945', '**Pertempuran 5 Hari** — dr. Kariadi gugur (lihat Bab 6)'],
        ['**Gorontalo**', '13 Sept 1945', 'Pemuda merebut senjata markas Jepang'],
        ['**Aceh**', '6 Okt 1945', '**API** dibentuk; dilarang Jepang → bentrok'],
        ['**Palembang**', '8 Okt 1945', '**Dr. A.K. Gani** kibarkan Merah Putih — tanpa insiden'],
        ['**Kalimantan**', '14 Nov 1945', '±**8.000 orang** arak Merah Putih ke kompleks NICA'],
        ['**Sumbawa**', 'Des 1945', 'Serbu pos Jepang di **Gempe, Sape, Raba**'],
        ['**Biak (Papua)**', '14 Mar 1948', 'Serang tangsi NICA (dipimpin Joseph) — gagal'],
      ]},
      { type: 'ingat', items: [
        'Pekik **“Merdeka!”** menjadi salam nasional.',
        'Perencana & penggerak Rapat Ikada = **Komite van Aksi**.',
      ]},
    ],
  },

  /* ============================ BAB 6 ============================ */
  {
    chapter: 6, phase: 'Mempertahankan', tone: 'red', icon: 'flame',
    tagline: 'Sekutu datang membonceng NICA (Belanda) yang ingin menjajah lagi — rakyat melawan di Surabaya, Ambarawa, Medan, Semarang, Bandung, dan Bali.',
    pertanyaan: 'Mengapa kedatangan Sekutu yang awalnya disambut berubah menjadi pertempuran?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'ship', title: 'AFNEI tiba', text: '29 Sept 1945 di Jakarta, pimpinan **Letjen Christison**, di bawah **SEAC** (Lord Mountbatten).' },
        { icon: 'mask', title: 'Membonceng NICA', text: 'NICA = pemerintahan sipil **Belanda**; mempersenjatai bekas **KNIL** → teror & provokasi.' },
        { icon: 'flame', title: 'Rakyat melawan', text: 'Kalah senjata, tapi membuktikan ke dunia: Indonesia **tidak mau dijajah lagi**.' },
      ]},
      { type: 'list', title: 'Tugas resmi AFNEI', ordered: true, items: [
        'Menerima penyerahan Jepang',
        'Membebaskan tawanan perang (orang Eropa)',
        'Melucuti & memulangkan tentara Jepang',
        'Menjaga keamanan sampai diserahkan ke pemerintah sipil',
        'Mencari penjahat perang Jepang',
      ]},
      { type: 'timeline', title: 'Pertempuran Surabaya — kronologi', items: [
        { date: '19 Sept 1945', title: 'Insiden Hotel Yamato', text: 'Mr. **Ploegman** kibarkan bendera Belanda. Perundingan dengan Residen Sudirman gagal → pemuda **sobek warna biru**.' },
        { date: '25 Okt 1945', title: 'Sekutu mendarat', text: 'Dipimpin Brigjen **A.W.S. Mallaby**.' },
        { date: '30 Okt 1945', title: 'Mallaby tewas', text: 'Di dekat Jembatan Merah → Inggris marah.' },
        { date: '9 Nov 1945', title: 'Ultimatum', text: 'Mayjen **Eric Mansergh**: menyerah paling lambat 10 Nov pukul 06.00.' },
        { date: '10 Nov 1945', title: 'Pertempuran besar', text: 'Serangan darat, laut, udara ±3 minggu. **Hari Pahlawan**.', hot: true },
      ]},
      { type: 'tokoh', title: 'Tokoh Surabaya', items: [
        { name: 'Bung Tomo', role: 'Membakar semangat lewat **siaran radio**', tag: 'Orator' },
        { name: 'Gubernur Suryo', role: 'Gubernur Jawa Timur, menolak ultimatum', tag: 'Pemimpin' },
        { name: 'KH Hasyim Asy\'ari', role: '**Resolusi Jihad** — seruan membela tanah air', tag: 'Ulama' },
        { name: 'Sungkono', role: 'Komandan pertahanan kota', tag: 'Militer' },
      ]},
      { type: 'grid', title: 'Peta pertempuran besar', items: [
        { title: 'Palagan Ambarawa', meta: 'Nov – 15 Des 1945', tag: 'Supit Urang', tone: 'teal', text: 'Pemicu: Sekutu bebaskan tawanan Belanda di Magelang & Ambarawa. **Kol. Soedirman** pakai taktik **Supit Urang** (jepit dari 2 sisi). **Letkol Isdiman** gugur.' },
        { title: 'Medan Area', meta: 'mulai 13 Okt 1945', tag: 'Sumatra Utara', tone: 'amber', text: 'Pemicu: lencana Merah Putih diinjak di **Pension Wilhelmina**. Sekutu (Brigjen T.E.D. Kelly) + NICA (Westerling). Tokoh: **Achmad Tahir**.' },
        { title: 'Pertempuran 5 Hari Semarang', meta: '15 – 20 Okt 1945', tag: 'vs Jepang', tone: 'violet', text: 'Isu air diracun → **dr. Kariadi** ditembak. ±2.000 rakyat gugur. Dikenang **Tugu Muda**.' },
        { title: 'Bandung Lautan Api', meta: '23 – 24 Mar 1946', tag: 'Bumi hangus', tone: 'red', text: 'Ultimatum kosongkan kota → Bandung Selatan **dibakar** sebelum ditinggalkan. **A.H. Nasution**, **Moh. Toha**, lagu “Halo-Halo Bandung”.' },
        { title: 'Puputan Margarana', meta: '20 Nov 1946', tag: 'Bali', tone: 'blue', text: '**I Gusti Ngurah Rai** & pasukan **Ciung Wanara** menolak **Negara Indonesia Timur** — bertempur sampai titik darah terakhir.' },
        { title: 'Pertempuran Biak', meta: '14 Mar 1948', tag: 'Papua', tone: 'green', text: 'Rakyat menyerang tangsi Belanda untuk kibarkan Merah Putih; gagal, pemimpin dihukum mati.' },
      ]},
      { type: 'vs', title: 'Strategi perang gerilya', a: { label: 'Cara TNI', tone: 'green' }, b: { label: 'Akibat bagi Belanda', tone: 'red' }, rows: [
        { aspect: 'Medan', a: 'Mundur ke **hutan & gunung**', b: 'Sulit dikejar, kalah kenal medan' },
        { aspect: 'Serangan', a: 'Serangan **mendadak**, lalu menghilang', b: 'Moral pasukan turun' },
        { aspect: 'Logistik', a: 'Putus jalur suplai musuh', b: 'Biaya perang **membengkak**' },
      ]},
      { type: 'jembatan', items: [
        '**Supit Urang** = Soedirman (Ambarawa) · **Radio** = Bung Tomo (Surabaya) · **Puputan** = Ngurah Rai (Bali) · **Bumi hangus** = Nasution (Bandung)',
      ]},
      { type: 'note', title: 'Catatan perbedaan sumber', items: [
        'Tewasnya Mallaby: ada yang menulis 28 Okt, yang tepat **30 Oktober 1945**.',
        'Bandung Lautan Api: pembakaran terjadi **23–24 Maret 1946** (bukan Oktober 1945).',
        'Teuku Umar, Cut Nyak Dhien, dkk. adalah pahlawan **era kolonial (sebelum 1945)** — bukan pejuang 1945–1949.',
      ]},
    ],
  },

  /* ============================ BAB 7 ============================ */
  {
    chapter: 7, phase: 'Mempertahankan', tone: 'blue', icon: 'handshake',
    tagline: 'Berjuang di dua front: meja perundingan dan medan perang. Setiap perjanjian dilanggar Belanda dengan agresi — tapi dunia makin memihak Indonesia.',
    pertanyaan: 'Kenapa Indonesia tetap berunding padahal hasilnya sering merugikan?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'compass', title: 'Kenapa diplomasi?', text: 'Kalah senjata & belum stabil → **ulur waktu**, kurangi korban, **cari simpati dunia**.' },
        { icon: 'repeat', title: 'Pola berulang', text: 'Berunding → **dilanggar Belanda** (agresi) → dunia mengecam → berunding lagi.' },
        { icon: 'globe', title: 'Hasilnya', text: 'Masalah Indonesia jadi **sengketa internasional** di PBB, bukan “urusan dalam negeri Belanda”.' },
      ]},
      { type: 'alur', title: 'Pola diplomasi vs agresi', steps: [
        { label: 'Linggarjati', text: 'Nov 1946 / Mar 1947' },
        { label: 'Agresi I', text: '21 Jul 1947' },
        { label: 'KTN → Renville', text: 'Jan 1948' },
        { label: 'Agresi II', text: '19 Des 1948' },
        { label: 'SU 1 Maret → Roem-Royen', text: 'Mei 1949' },
        { label: 'Inter-Indonesia → KMB', text: 'Jul – Nov 1949' },
      ]},
      { type: 'table', title: 'Perbandingan perjanjian', head: ['', 'Linggarjati', 'Renville', 'Roem-Royen'], rows: [
        ['**Waktu**', '11–15 Nov 1946 (ttd 25 Mar 1947)', '17 Jan 1948', '7 Mei 1949'],
        ['**Tempat**', 'Linggarjati, Kuningan', 'Kapal **USS Renville**, Teluk Jakarta', 'Hotel Des Indes, Jakarta'],
        ['**Ketua RI**', 'Sutan Sjahrir', 'Amir Sjarifuddin', 'Mohammad Roem'],
        ['**Ketua Belanda**', 'Wim Schermerhorn', 'R. Abdulkadir Widjojoatmodjo', 'J.H. van Roijen'],
        ['**Penengah**', 'Lord Killearn (Inggris)', 'KTN', 'UNCI (Merle Cochran)'],
        ['**Isi kunci**', 'De facto RI: **Jawa, Sumatra, Madura**; rencana RIS & Uni', 'Wilayah RI makin kecil; **Garis Van Mook**; TNI keluar kantong → Long March Siliwangi', 'RI hentikan gerilya & ikut KMB; Belanda **kembalikan pemerintah RI ke Yogyakarta**'],
        ['**Dampak**', 'Wilayah sempit → pro-kontra; dilanggar **Agresi I**', 'Kabinet Amir jatuh; DI/TII & PKI Madiun; dilanggar **Agresi II**', 'Pemerintah kembali ke Yogya (6 Jul 1949) → jalan ke KMB'],
      ]},
      { type: 'vs', title: 'Agresi Militer I vs II', a: { label: 'Agresi I (1947)', tone: 'amber' }, b: { label: 'Agresi II (1948)', tone: 'red' }, rows: [
        { aspect: 'Sandi', a: '**Operatie Product**', b: '**Operatie Kraai** (Gagak)' },
        { aspect: 'Waktu', a: '21 Juli – 5 Agustus 1947', b: '19 Desember 1948' },
        { aspect: 'Incaran', a: '**Ekonomi**: perkebunan, tambang, minyak', b: '**Politik**: ibu kota Yogyakarta & pemimpin RI' },
        { aspect: 'Akibat', a: 'TNI bergerilya', b: 'Soekarno-Hatta ditangkap, diasingkan ke **Bangka & Brastagi**' },
        { aspect: 'Respons dunia', a: 'India & Australia bawa ke DK PBB → **KTN**', b: 'Kecaman keras, AS ancam **Marshall Plan** → **UNCI**' },
      ]},
      { type: 'grid', title: 'Kunci kemenangan saat Agresi II', items: [
        { title: 'PDRI', meta: '22 Des 1948 · Bukittinggi', tone: 'teal', text: '**Sjafruddin Prawiranegara** menjalankan pemerintahan darurat → bukti RI **masih ada**. Cadangan di New Delhi: Maramis, Sudarsono, Palar.' },
        { title: 'Perang Gerilya', meta: 'Jend. Soedirman', tone: 'green', text: 'Meski sakit keras, Soedirman memimpin gerilya dari pedalaman.' },
        { title: 'Serangan Umum 1 Maret 1949', meta: 'Yogyakarta · 6 jam', tone: 'red', text: 'Dirancang **Sri Sultan HB IX** & Soedirman. Membantah propaganda Belanda di PBB bahwa **TNI sudah hancur**.' },
      ]},
      { type: 'list', title: 'Komisi Tiga Negara (KTN) — 25 Agustus 1947', items: [
        '**Australia** — pilihan Indonesia (Richard Kirby)',
        '**Belgia** — pilihan Belanda (Paul van Zeeland)',
        '**Amerika Serikat** — pilihan bersama (Frank Graham)',
      ]},
      { type: 'grid', title: 'Konferensi Inter-Indonesia (RI + BFO)', items: [
        { title: 'Tahap I', meta: '19–22 Jul 1949 · Yogyakarta', tone: 'blue', text: 'Negara bernama **RIS**; ada DPR & Senat; angkatan perang **APRIS** (inti TNI).' },
        { title: 'Tahap II', meta: '31 Jul – 3 Agt 1949 · Jakarta', tone: 'blue', text: 'Bendera **Merah Putih**, lagu **Indonesia Raya**, bahasa **Indonesia**.' },
        { title: 'Tujuan', tone: 'ink', text: 'Gagalkan politik **devide et impera** Belanda; satu suara menghadapi KMB.' },
      ]},
      { type: 'jembatan', items: [
        'Urutan: **“Lina Rela Rumah Indah Kami”** → **Li**nggarjati – **Re**nville – **Ro**em-Royen – **I**nter-Indonesia – **K**MB',
        'Agresi I = **E**konomi · Agresi II = **P**olitik',
        'Penengah: Linggarjati = **Inggris** · Renville = **KTN** · Roem-Royen & KMB = **UNCI**',
      ]},
    ],
  },

  /* ============================ BAB 8 ============================ */
  {
    chapter: 8, phase: 'Kedaulatan', tone: 'violet', icon: 'award',
    tagline: 'Konferensi Meja Bundar di Den Haag berujung pada pengakuan kedaulatan 27 Desember 1949 — akhir perjuangan 1945–1949.',
    pertanyaan: 'Apa beda “penyerahan” dan “pengakuan” kedaulatan, dan kenapa itu penting?',
    blocks: [
      { type: 'inti', items: [
        { icon: 'flag', title: 'KMB', text: '**23 Agt – 2 Nov 1949** di **Den Haag**. Delegasi RI: **Moh. Hatta**; BFO: **Sultan Hamid II**.' },
        { icon: 'pen', title: '27 Des 1949', text: 'Belanda mengakui kedaulatan kepada **RIS** — ditandatangani serentak di **Amsterdam & Jakarta**.' },
        { icon: 'scale', title: 'Fisik + diplomasi', text: 'Keduanya **saling melengkapi**: perlawanan bersenjata menguatkan posisi di meja perundingan.' },
      ]},
      { type: 'list', title: 'Hasil KMB', ordered: true, items: [
        'Belanda mengakui kedaulatan kepada **Republik Indonesia Serikat (RIS)**',
        'Indonesia berbentuk **negara serikat** (16 negara bagian)',
        'Dibentuk **Uni Indonesia-Belanda** — longgar & sederajat',
        'RIS menanggung utang Hindia Belanda **±4,3 miliar gulden**',
        'Masalah **Irian Barat ditunda** satu tahun',
      ]},
      { type: 'table', title: 'Penandatanganan 27 Desember 1949', head: ['Kota', 'Penandatangan'], rows: [
        ['**Amsterdam**', 'Ratu **Juliana**, PM **Willem Drees** (Belanda) & **Moh. Hatta** (RIS)'],
        ['**Jakarta**', 'Wakil Tinggi Mahkota **A.H.J. Lovink** & **Sri Sultan HB IX**'],
      ]},
      { type: 'vs', title: '“Penyerahan” vs “Pengakuan” kedaulatan', a: { label: 'Versi Belanda: PENYERAHAN', tone: 'amber' }, b: { label: 'Versi Indonesia: PENGAKUAN', tone: 'red' }, rows: [
        { aspect: 'Artinya', a: 'Kedaulatan milik Belanda sampai 27 Des 1949, lalu “diberikan”', b: 'Indonesia sudah berdaulat **sejak 17 Agustus 1945**' },
        { aspect: 'Masa 1945–1949', a: 'Dianggap **pemberontakan** internal', b: 'Perjuangan **sah** negara merdeka' },
        { aspect: '27 Des 1949', a: 'Awal negara Indonesia', b: 'Hanya **pengakuan de jure** atas yang sudah ada' },
      ]},
      { type: 'vs', title: 'Kenapa KMB lebih untung daripada Renville?', a: { label: 'Saat Renville (1948)', tone: 'ink' }, b: { label: 'Saat KMB (1949)', tone: 'green' }, rows: [
        { aspect: 'Militer', a: 'TNI terdesak setelah Agresi I', b: '**SU 1 Maret** buktikan TNI masih kuat' },
        { aspect: 'Dunia', a: 'Dukungan belum kuat', b: 'Agresi II **dikecam DK PBB**' },
        { aspect: 'Tekanan', a: 'RI diblokade ekonomi', b: '**AS menekan Belanda** (Marshall Plan)' },
      ]},
      { type: 'timeline', title: 'Kapan Belanda mengakui 17 Agustus 1945?', items: [
        { date: '27 Des 1949', title: 'Pengakuan kedaulatan kepada RIS', hot: true },
        { date: '17 Agt 1950', title: 'RIS kembali menjadi NKRI' },
        { date: '16 Agt 2005', title: 'Menlu Bernard Bot', text: 'Menerima secara **politik & moral**.' },
        { date: '14 Jun 2023', title: 'PM Mark Rutte', text: 'Mengakui **sepenuhnya & tanpa syarat**.', hot: true },
      ]},
      { type: 'ingat', items: [
        '**De facto** = pengakuan atas **keberadaan nyata** (contoh: Linggarjati).',
        '**De jure** = pengakuan **resmi secara hukum** internasional (contoh: hasil KMB).',
        'Irian Barat **tidak** ikut diserahkan di KMB — ditunda.',
      ]},
    ],
  },
];

export const ringkasFor = (n: number): Ringkas | undefined => RINGKAS.find(r => r.chapter === n);
