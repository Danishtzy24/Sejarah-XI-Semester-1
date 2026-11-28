import type { Course, LessonSection, Part } from '../types';
import { QUESTIONS } from './soal';

/* Materi Bab III — Strategi Mempertahankan Kemerdekaan.
   Sumber: modul "STRATEGI MEMPERTAHANKAN KEMERDEKAAN" (PDF guru). Isi mengikuti modul,
   ejaan dirapikan; catatan kecil ditambahkan bila ada angka yang perlu diperhatikan. */

const strip = (h: string) => h.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const S = (id: string, number: string, title: string, part: Part, date: string, lead: string): LessonSection =>
  ({ id, number, title, part, date, lead: lead.trim(), details: [], search: strip(title + ' ' + lead) });
const tokoh = (items: [string, string][]) => `<ul class="tk-list">${items.map(([n, r]) => `<li><strong>${n}</strong> &ndash; ${r}</li>`).join('')}</ul>`;

const SECTIONS: LessonSection[] = [
  /* =================== A. PERJUANGAN FISIK =================== */
  S('a0', 'A', 'Kedatangan Sekutu dan NICA', 'fisik', 'Sep – Okt 1945', `
<p>Setelah Jepang menyerah, Sekutu memerintahkan tentara Jepang di Indonesia menjaga <strong>status quo</strong>, yaitu mempertahankan keadaan sebagaimana adanya sampai Sekutu tiba. Amerika memusatkan perhatian ke Jepang, sedangkan Indonesia diserahkan kepada <strong>SEAC</strong> (<em>South East Asia Command</em>, Komando Asia Tenggara) milik Inggris di bawah <strong>Laksamana Lord Louis Mountbatten</strong>.</p>
<p>Pada <strong>29 September 1945</strong> pasukan SEAC tiba di Jakarta dengan nama <strong>AFNEI</strong> (<em>Allied Forces Netherlands East Indies</em>), dipimpin <strong>Letjen Sir Philip Christison</strong> (Inggris). AFNEI bertugas di wilayah barat, terutama Sumatra dan Jawa. Wilayah timur diserahkan kepada Australia.</p>
<h3>Tugas AFNEI</h3>
<ol>
<li>Menerima penyerahan Jepang.</li>
<li>Membebaskan tawanan perang asal Eropa yang ditahan Jepang.</li>
<li>Melucuti dan memulangkan tentara Jepang.</li>
<li>Menegakkan dan memelihara keadaan damai untuk kemudian diserahkan kepada pemerintah sipil.</li>
<li>Mencari keterangan tentang penjahat perang Jepang untuk diadili di pengadilan Sekutu.</li>
</ol>
<h3>Mengapa muncul ketegangan?</h3>
<ul>
<li>Awalnya AFNEI disambut baik karena pemerintah berharap Sekutu menyerahkan kekuasaan kepada Indonesia.</li>
<li>Ternyata Inggris membawa <strong>NICA</strong> (<em>Netherlands Indies Civil Administration</em>), badan semimiliter yang ditugasi menjalankan pemerintahan sipil di Hindia Belanda. Banyak pegawainya orang Belanda.</li>
<li>NICA mempersenjatai kembali bekas anggota <strong>KNIL</strong> yang baru dibebaskan dari tahanan Jepang. Di berbagai daerah NICA dan KNIL, dengan dukungan Inggris, melakukan provokasi dan teror.</li>
</ul>
<p>Untuk meredakan keadaan, pada <strong>1 Oktober 1945</strong> panglima AFNEI menyatakan akan memperlakukan pemerintah RI di daerah sebagai kekuasaan <strong>de facto</strong>. Pemerintah RI pun mendukung misi AFNEI. Namun di lapangan, kedatangan Sekutu hampir selalu menimbulkan insiden karena mereka tidak menghormati kedaulatan Indonesia. Akibatnya pecah pertempuran di Surabaya, Sukabumi, Medan, Ambarawa, Manado, dan Bandung.</p>
<p class="inti"><strong>Inti:</strong> Sekutu (AFNEI) datang untuk urusan pascaperang, tetapi membawa NICA yang ingin mengembalikan kekuasaan Belanda. Inilah pemicu perjuangan fisik di banyak daerah.</p>`),

  S('a1', 'A.1', 'Pertempuran Surabaya', 'fisik', '27 Okt – 20 Nov 1945', `
<p>Konflik bersenjata besar antara pasukan Indonesia melawan tentara Inggris dan India-Britania (diboncengi NICA). Berlangsung <strong>27 Oktober – 20 November 1945</strong>, dengan puncak pada <strong>10 November 1945</strong> yang kini diperingati sebagai <strong>Hari Pahlawan</strong>.</p>
<h3>Latar belakang</h3>
<ul>
<li><strong>Insiden Hotel Yamato (19 September 1945):</strong> orang-orang Belanda mengibarkan bendera Belanda di Hotel Yamato, Jalan Tunjungan. Pemuda Surabaya merobek bagian birunya sehingga tersisa Merah Putih.</li>
<li><strong>Kedatangan Sekutu (25 Oktober 1945):</strong> AFNEI tiba di Surabaya dipimpin <strong>Brigjen A.W.S. Mallaby</strong>. Di balik misi melucuti Jepang, ikut pasukan NICA.</li>
<li><strong>Tewasnya Mallaby (30 Oktober 1945):</strong> baku tembak dan ledakan granat di dekat <strong>Jembatan Merah</strong> menewaskan Mallaby dan membuat Inggris marah.</li>
</ul>
<h3>Kronologi</h3>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Peristiwa</th></tr></thead><tbody>
<tr><td>9 Nov 1945</td><td>Pengganti Mallaby, <strong>Mayjen Eric Carden Robert Mansergh</strong>, mengeluarkan ultimatum: pejuang harus menyerahkan senjata paling lambat 10 November pukul 06.00.</td></tr>
<tr><td>10 Nov 1945</td><td>Ultimatum ditolak. Inggris menyerang besar-besaran dari darat, laut, dan udara.</td></tr>
<tr><td>10 – 20 Nov 1945</td><td>Arek-arek Suroboyo dan laskar rakyat terus melawan dengan semboyan <em>&ldquo;Merdeka atau Mati!&rdquo;</em>, digerakkan Bung Tomo, Gubernur Suryo, KH Hasyim Asy&rsquo;ari (Resolusi Jihad), dan Sungkono.</td></tr>
</tbody></table></div>
<h3>Dampak</h3>
<ul>
<li>Diperkirakan <strong>6.300 &ndash; 20.000</strong> pejuang dan warga gugur, ribuan terluka. Di pihak Inggris ratusan hingga ribuan tentara tewas atau hilang.</li>
<li>Meski kota dikuasai Sekutu, pertempuran ini membuktikan kepada dunia bahwa Indonesia bertekad kuat dan tidak mau dijajah kembali.</li>
</ul>
<h3>Tokoh</h3>
${tokoh([
  ['Bung Tomo (Sutomo)', 'orator yang membakar semangat arek-arek Suroboyo lewat siaran radio.'],
  ['HR Mohamad Mangoendiprodjo', 'pemimpin TKR dan wakil ketua Biro Kontak di Surabaya.'],
  ['Soengkono', 'komandan pertahanan rakyat Surabaya.'],
  ['Moestopo', 'tokoh militer yang memimpin laskar pejuang di Surabaya.'],
])}
<p class="inti"><strong>Inti:</strong> Insiden Yamato, tewasnya Mallaby, lalu ultimatum Mansergh berujung pada pertempuran 10 November, yang kini kita kenal sebagai Hari Pahlawan.</p>`),

  S('a2', 'A.2', 'Perang Aceh', 'fisik', '1946 – 1947', `
<p>Pasukan Aceh dari <strong>Divisi Gajah I</strong> menempatkan satu resimen di Medan Area (RIMA). Batalyon I dan II menduduki Medan Tengah dan Selatan. <strong>Divisi Gajah II</strong> di bawah <strong>Kolonel Simbolon</strong> bertugas menduduki Medan Barat, dibantu Batalyon Meriam Kapten Nukum Sanami di Medan Timur, Batalyon NIP Xarim, Batalyon Bejo, dan laskar rakyat lain.</p>
<h3>Jalannya peristiwa</h3>
<ol>
<li>Pada hari H, Divisi Gajah I dan II gagal menduduki Kota Medan. Satu kompi sempat masuk jalan raya Medan&ndash;Belawan (Tandem Hilir), tetapi mundur dua hari kemudian.</li>
<li>Saat <strong>Clash I</strong> (agresi Belanda), Belanda menguasai Medan Area dan pasukan RI mundur.</li>
<li>Agar tidak jatuh ke tangan Belanda, pasukan RI <strong>membumihanguskan Pangkalan Berandan</strong>, daerah minyak.</li>
<li>Pasukan mundur ke <strong>Tanjung Pura</strong>, bertahan di tepi Sungai Tanjung Pura, lalu mundur lagi ke <strong>Gebang</strong> di perbatasan Aceh&ndash;Sumatra Timur. Satu resimen baru didatangkan dari Aceh untuk bertahan di Gebang.</li>
</ol>
<p class="catatan"><strong>Catatan:</strong> Modul menulis Clash I terjadi 21 April 1947. Dalam bagian Agresi Militer I, Clash I (Operatie Product) dimulai <strong>21 Juli 1947</strong>. Pakai tanggal Juli bila ditanya tanggal Agresi Militer I.</p>
<h3>Tokoh perlawanan Aceh (daftar dalam modul)</h3>
${tokoh([
  ['Teuku Umar', 'pemimpin gerilya yang cerdik, pernah pura-pura bekerja sama dengan Belanda untuk mengumpulkan senjata.'],
  ['Cut Nyak Dhien', 'istri Teuku Umar, melanjutkan perang gerilya di pedalaman setelah suaminya gugur.'],
  ['Teungku Chik di Tiro', 'ulama yang mengobarkan semangat Perang Sabil.'],
  ['Cut Nyak Meutia', 'pahlawan wanita dari Aceh Utara yang memimpin perlawanan bersenjata.'],
  ['Laksamana Malahayati', 'pemimpin pasukan laut Inong Balee dari Kesultanan Aceh.'],
  ['Teuku Nyak Arief', 'pejuang dan Gubernur/Residen Aceh pertama pada awal kemerdekaan.'],
])}
<p class="catatan"><strong>Catatan:</strong> Selain Teuku Nyak Arief, tokoh di atas berjuang pada masa Perang Aceh melawan kolonial Belanda sebelum abad ke-20, bukan pada 1945&ndash;1949.</p>`),

  S('a3', 'A.3', 'Pertempuran Ambarawa', 'fisik', 'Des 1945', `
<p>Gerakan maju tentara Inggris ke Ambarawa dan Magelang berhasil dipukul mundur pada <strong>14 Desember 1945</strong>. Peristiwa ini dikenal sebagai <strong>Palagan Ambarawa</strong>.</p>
<h3>Setelah Palagan Ambarawa</h3>
<ul>
<li>Akhir September 1946, tentara Belanda mulai mengambil alih posisi Inggris setelah mendatangkan bala bantuan dari negeri Belanda yang disebut <strong>Divisi 7 Desember</strong>.</li>
<li>Sampai Oktober 1946 Belanda sudah menghimpun <strong>3 divisi di Jawa</strong> dan <strong>3 brigade di Sumatra</strong>.</li>
<li>Inggris resmi menyerahkan tugas pendudukannya kepada Belanda pada <strong>30 November 1946</strong>. Belanda merasa cukup kuat untuk memaksakan kehendaknya kepada RI.</li>
</ul>
<h3>Tokoh</h3>
${tokoh([
  ['Kolonel Soedirman', 'memimpin taktik <em>supit urang</em> (mengepung musuh dari dua sisi) hingga Sekutu terpukul mundur.'],
  ['Letkol Isdiman', 'perwira TKR dan komandan resimen yang gugur di Ambarawa.'],
])}
<p class="catatan"><strong>Catatan:</strong> Modul menulis 14 Desember 1945. Banyak buku menulis kemenangan Ambarawa pada <strong>15 Desember 1945</strong>, yang diperingati sebagai Hari Juang Kartika (Hari Infanteri).</p>`),

  S('a4', 'A.4', 'Pertempuran Medan Area', 'fisik', '13 Okt 1945', `
<p>Provokasi Belanda di Medan meningkat sejak Sekutu mendarat. Titik api pergolakan ada di <strong>Pension Wilhelmina</strong>, Jalan Bali (seberang Pasar Sentral). Gedung itu menjadi asrama dan markas serdadu Ambon bekas KNIL pimpinan <strong>Westerling</strong>.</p>
<h3>Peristiwa 13 Oktober 1945</h3>
<ol>
<li>Tersiar kabar seorang pengawal merenggut dan menginjak-injak <strong>lencana Merah Putih</strong> yang dipakai seorang anak Indonesia.</li>
<li>Massa berkumpul di depan markas, terjadi bentrok. Dua orang Belanda di atas kendaraan menembaki rombongan masyarakat.</li>
<li>Pasukan Jepang bersama barisan bekas militer BPI pimpinan <strong>Achmad Tahir</strong> (calon TKR) datang meredakan keadaan.</li>
<li>Sekutu berjanji memindahkan orang Ambon dari Pension Wilhelmina. Massa bubar pukul 13.30. Dua orang Indonesia dan seorang wanita Ambon meninggal.</li>
</ol>
<h3>Tokoh</h3>
${tokoh([
  ['Achmad Tahir', 'pemimpin barisan pemuda dan pembentuk kekuatan perlawanan rakyat di Sumatra Utara.'],
  ['Dr. Ferdinand Lumbantobing', 'tokoh dan gubernur militer yang mengatur pertahanan.'],
  ['Abdul Karim M.S.', 'pemimpin barisan pemuda dalam menghadapi Sekutu dan NICA.'],
  ['R. Soehardjo Hardjowardojo', 'tokoh militer yang aktif mempertahankan wilayah Medan.'],
])}
<p class="inti"><strong>Inti:</strong> Medan Area dipicu penghinaan lencana Merah Putih di Pension Wilhelmina, markas bekas KNIL pimpinan Westerling.</p>`),

  S('a5', 'A.5', 'Bandung Lautan Api', 'fisik', '23 – 24 Mar 1946', `
<p>Pasukan Inggris masuk Bandung sejak pertengahan Oktober 1945. Menjelang November 1945, NICA melakukan aksi teror. Indonesia sudah mengosongkan <strong>Bandung Utara</strong>, tetapi Sekutu menuntut pengosongan sejauh <strong>11 km</strong>.</p>
<p>Rakyat marah dan memilih <strong>membumihanguskan Bandung Selatan</strong> sebelum ditinggalkan. Kota terbakar dari batas timur <strong>Cicadas</strong> sampai batas barat <strong>Andir</strong>. Sekitar <strong>satu juta</strong> penduduk mengungsi pada <strong>23 &ndash; 24 Maret 1946</strong>.</p>
<h3>Perlawanan di wilayah kekuasaan Belanda</h3>
<ul>
<li><strong>Bogor:</strong> peringatan proklamasi tetap dilakukan. Merah Putih dipasang di dinding rumah, gambar Presiden Soekarno digantung, rakyat membaca selawat 1000 kali, berdoa, dan menyajikan bubur merah putih. Ziarah ke Kebun Kembang gagal karena dijaga ketat Belanda.</li>
<li><strong>Bandung:</strong> panitia 17 Agustus pimpinan <strong>R.P.S. Gondokusumo</strong> diizinkan <strong>Recomba</strong> merayakan proklamasi secara tertutup, dihadiri tidak lebih dari 50 orang.</li>
</ul>
<h3>Tokoh</h3>
${tokoh([
  ['Kolonel A.H. Nasution', 'komandan Divisi III TRI/Siliwangi yang memerintahkan evakuasi dan pembumihangusan Bandung Selatan.'],
  ['Mohammad Toha', 'anggota BRI (Barisan Rakjat Indonesia) yang gugur saat meledakkan gudang amunisi Sekutu di Dayeuhkolot.'],
  ['Sutan Sjahrir', 'Perdana Menteri yang mengarahkan strategi diplomasi dan pertahanan.'],
  ['Mayor Rukana', 'komandan Polisi Militer yang mencetuskan ide pembakaran Bandung Selatan.'],
  ['Atje Bastaman', 'wartawan Suara Merdeka yang mendokumentasikan peristiwa ini.'],
  ['Ismail Marzuki', 'pencipta lagu &ldquo;Halo-Halo Bandung&rdquo; yang terinspirasi peristiwa ini.'],
])}`),

  S('a6', 'A.6', 'Pertempuran Lima Hari di Semarang', 'fisik', '15 – 19 Okt 1945', `
<p>Dikenal juga sebagai <strong>Palagan 5 Dina</strong>, pertempuran rakyat melawan sisa tentara <strong>Jepang</strong> pada awal kemerdekaan. Berlangsung <strong>15 &ndash; 19 Oktober 1945</strong>, dengan ketegangan sejak 14 Oktober. Lokasi utamanya Kintelan, Pandanaran, Jombang, Simpang Lima, dan Tugu Muda.</p>
<h3>Pemicu</h3>
<ul>
<li>Tentara Jepang menolak menyerahkan senjata kepada pihak Indonesia.</li>
<li>Beredar kabar Jepang meracuni sumber air minum warga di <strong>Tandon Air Siranda (Wungkal)</strong>.</li>
<li><strong>dr. Kariadi</strong>, Kepala Laboratorium Malaria Purusara, ditembak Jepang saat hendak memeriksa tandon itu pada <strong>14 Oktober 1945</strong>.</li>
<li>Sebelumnya pemuda dan Polisi Istimewa sempat dilucuti dan disiksa pasukan Jepang dari kesatuan <strong>Kidobutai</strong>.</li>
</ul>
<h3>Kronologi</h3>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Peristiwa</th></tr></thead><tbody>
<tr><td>14 Okt 1945</td><td>Ketegangan memuncak setelah kabar tewasnya dr. Kariadi dan penangkapan pemuda.</td></tr>
<tr><td>15 Okt 1945</td><td>Pertempuran pecah. Sekitar 2.000 tentara Kidobutai bergabung dengan pasukan <strong>Mayjen Nakamura</strong> menyerang pusat kota. Pemuda, BKR, dan Polisi Istimewa melawan dengan senjata seadanya.</td></tr>
<tr><td>16 &ndash; 18 Okt 1945</td><td>Perlawanan meluas. Jepang melakukan pembersihan kampung dan penahanan massal (tragedi Sobokarti, pembakaran Kampung Batik).</td></tr>
<tr><td>19 &ndash; 20 Okt 1945</td><td>Gencatan senjata diupayakan lewat perantara Inggris yang mendarat di Semarang. Pertempuran mereda.</td></tr>
</tbody></table></div>
<h3>Dampak</h3>
<ul>
<li>Sekitar <strong>2.000</strong> pejuang dan rakyat gugur. Di pihak Jepang ratusan tewas.</li>
<li><strong>Tugu Muda</strong> didirikan di simpang Jalan Pandanaran, Pemuda, dan Imam Bonjol, diresmikan Presiden Soekarno pada <strong>20 Mei 1953</strong>.</li>
</ul>
<p class="inti"><strong>Inti:</strong> Lawannya Jepang, bukan Sekutu. Pemicunya isu racun di tandon air dan gugurnya dr. Kariadi. Monumennya Tugu Muda.</p>`),

  S('a7', 'A.7', 'Agresi Militer Belanda I', 'fisik', '21 Jul – 5 Agu 1947', `
<p>Belanda menyebutnya <strong><em>Operatie Product</em></strong> atau Aksi Polisionil Pertama: operasi militer terhadap wilayah de facto RI di Jawa dan Sumatra, berlangsung <strong>21 Juli &ndash; 5 Agustus 1947</strong> (16 hari).</p>
<h3>Latar belakang</h3>
<ul>
<li>Perbedaan penafsiran hasil <strong>Perjanjian Linggarjati</strong>.</li>
<li>Belanda ingin menguasai kembali daerah strategis dan ekonomis (perkebunan karet, tembakau, minyak) untuk memulihkan ekonominya setelah Perang Dunia II.</li>
<li>Belanda menuduh Indonesia melanggar kesepakatan, lalu menyerang tanpa pernyataan perang resmi.</li>
</ul>
<p><strong>Sasaran:</strong> Jawa Barat, Jawa Timur, Sumatra Timur, serta kota penting seperti Semarang, Solo, Malang, dan Medan.</p>
<p><strong>Respons Indonesia:</strong> TNI dan laskar rakyat melawan dengan <strong>perang gerilya</strong> di bawah Panglima Besar <strong>Jenderal Soedirman</strong>.</p>
<h3>Tekanan internasional</h3>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Peristiwa</th></tr></thead><tbody>
<tr><td>Juli 1947</td><td>India, Australia, dan Mesir memprotes agresi.</td></tr>
<tr><td>31 Jul 1947</td><td>Atas desakan India dan Australia, masalah Indonesia masuk agenda Dewan Keamanan PBB.</td></tr>
<tr><td>1 Agu 1947</td><td>DK PBB mengeluarkan <strong>Resolusi No. 27</strong>: kedua pihak harus menghentikan tembak-menembak. Agresi berhenti 5 Agustus 1947.</td></tr>
<tr><td>14 Agu 1947</td><td>Delegasi Indonesia pimpinan <strong>Sutan Sjahrir</strong> berpidato di sidang DK PBB.</td></tr>
<tr><td>25 Agu 1947</td><td>PBB membentuk <strong>Komisi Tiga Negara (KTN)</strong>: <strong>Australia</strong> (pilihan Indonesia), <strong>Belgia</strong> (pilihan Belanda), dan <strong>Amerika Serikat</strong> (pilihan bersama).</td></tr>
</tbody></table></div>
<p>DK PBB juga selalu memakai nama <strong>Indonesia</strong>, bukan <em>Netherlands Indies</em>. Secara tidak langsung ini mengakui keberadaan politik Republik Indonesia.</p>
<p class="inti"><strong>Inti:</strong> Agresi I mengincar sumber ekonomi. Hasil diplomasinya: masalah Indonesia masuk PBB dan lahir KTN, yang kemudian memediasi Perundingan Renville.</p>`),

  S('a8', 'A.8', 'Agresi Militer Belanda II', 'fisik', '19 Des 1948 – 5 Jan 1949', `
<p>Sandinya <strong><em>Operatie Kraai</em></strong> (Operasi Gagak): serangan besar-besaran Belanda terhadap RI pada <strong>19 Desember 1948 &ndash; 5 Januari 1949</strong>.</p>
<h3>Latar belakang</h3>
<ul>
<li>Saling tuduh melanggar <strong>Perjanjian Renville</strong>: Belanda menuduh RI melanggar gencatan senjata, RI menuduh Belanda terus memperluas wilayah.</li>
<li>Tujuan Belanda: melumpuhkan pusat pemerintahan, menangkap para pemimpin, dan menunjukkan kepada dunia bahwa RI dan TNI sudah tidak ada.</li>
</ul>
<h3>Kronologi</h3>
<ul>
<li><strong>19 Desember 1948:</strong> Pangkalan Udara <strong>Maguwo</strong> dibom, disusul penerjunan pasukan payung di bawah <strong>Jenderal Simon Spoor</strong> dan <strong>Kolonel D.R.A. van Langen</strong>.</li>
<li><strong>Yogyakarta</strong>, ibu kota RI saat itu, jatuh dalam waktu singkat.</li>
<li>Soekarno, Hatta, Sutan Sjahrir, dan sejumlah pejabat ditangkap di Gedung Agung, lalu diasingkan ke <strong>Pulau Bangka</strong> dan <strong>Brastagi</strong>.</li>
<li><strong>22 Desember 1948:</strong> <strong>Mr. Sjafruddin Prawiranegara</strong> mendirikan <strong>PDRI</strong> (Pemerintah Darurat Republik Indonesia) di <strong>Bukittinggi</strong>, Sumatra Barat, agar pemerintahan tetap berjalan.</li>
<li>Jenderal Soedirman, meski sakit keras, memimpin <strong>perang gerilya</strong> dari pedalaman.</li>
</ul>
<h3>Dampak</h3>
<ul>
<li>Dunia mengecam Belanda. Amerika Serikat mengancam menghentikan bantuan <strong>Marshall Plan</strong>.</li>
<li>Lewat <strong>Resolusi 67</strong>, PBB mengganti KTN dengan <strong>UNCI</strong> (<em>United Nations Commission for Indonesia</em>) yang wewenangnya lebih besar: mengawasi gencatan senjata, memfasilitasi perundingan, dan membantu pengembalian kekuasaan.</li>
<li>Tekanan PBB dan Amerika memaksa Belanda kembali berunding lewat <strong>Perundingan Roem-Royen</strong>, lalu KMB, hingga pengakuan kedaulatan 27 Desember 1949.</li>
</ul>
<p class="inti"><strong>Inti:</strong> Agresi II mengincar pusat politik (Yogyakarta dan para pemimpin). RI bertahan lewat PDRI dan gerilya, sementara tekanan dunia membuat KTN diganti UNCI.</p>`),

  /* =================== B. PERJUANGAN DIPLOMASI =================== */
  S('b0', 'B', 'Mengapa memilih diplomasi?', 'diplomasi', '1946 – 1949', `
<p>Perjuangan diplomasi dilakukan dengan <strong>tiga cara</strong>:</p>
<ol>
<li>Mencari dukungan negara-negara anggota PBB.</li>
<li>Membawa masalah Indonesia&ndash;Belanda ke Dewan Keamanan PBB.</li>
<li>Berunding langsung dengan Belanda.</li>
</ol>
<p>Karena keamanan terus memburuk, <strong>Inggris</strong> mengambil inisiatif mengajak Indonesia dan Belanda ke meja perundingan.</p>
<h3>Alasan memakai jalur diplomasi</h3>
<ul>
<li>Kondisi Indonesia saat itu masih jauh dari stabil.</li>
<li>Untuk menarik simpati dan dukungan dunia internasional.</li>
</ul>
<p>Lewat tokoh terpelajar dan negosiator ulung, diplomasi ikut mengantarkan Indonesia terbebas dari upaya penjajahan kembali oleh Belanda.</p>`),

  S('b1', 'B.1', 'Perjanjian Linggarjati', 'diplomasi', 'Nov 1946 – Mar 1947', `
<p>Kesepakatan Indonesia&ndash;Belanda di <strong>Linggarjati, Kuningan, Jawa Barat</strong> untuk menyelesaikan konflik pascaproklamasi.</p>
<ul>
<li><strong>Perundingan:</strong> 11 &ndash; 15 November 1946 di Linggarjati.</li>
<li><strong>Penandatanganan:</strong> 25 Maret 1947 di Istana Merdeka (Rijswijk), Jakarta.</li>
</ul>
<h3>Tokoh</h3>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Anggota</th></tr></thead><tbody>
<tr><td>Indonesia</td><td><strong>Sutan Sjahrir</strong> (ketua), A.K. Gani, Susanto Tirtoprodjo, Mohammad Roem</td></tr>
<tr><td>Belanda</td><td><strong>Wim Schermerhorn</strong> (ketua), H.J. van Mook, Max van Poll, F. de Boer</td></tr>
<tr><td>Penengah</td><td><strong>Lord Killearn</strong> (Inggris)</td></tr>
</tbody></table></div>
<h3>Isi pokok (17 pasal)</h3>
<ol>
<li>Belanda mengakui secara <strong>de facto</strong> wilayah RI atas <strong>Jawa, Sumatra, dan Madura</strong>.</li>
<li>Indonesia dan Belanda sepakat membentuk <strong>Republik Indonesia Serikat (RIS)</strong>.</li>
<li>RIS dan Belanda tergabung dalam <strong>Uni Indonesia-Belanda</strong> yang diketuai Ratu Belanda.</li>
<li>Belanda menarik pasukannya dari wilayah de facto RI paling lambat <strong>1 Januari 1949</strong>.</li>
</ol>
<h3>Dampak</h3>
<ul>
<li><strong>Pro-kontra di dalam negeri:</strong> wilayah RI dianggap menyempit, posisi kabinet melemah.</li>
<li><strong>Dukungan luar negeri meningkat:</strong> diakui Inggris, Amerika Serikat, Mesir, dan negara lain.</li>
<li><strong>Dilanggar Belanda</strong> lewat Agresi Militer I pada 21 Juli 1947.</li>
</ul>`),

  S('b2', 'B.2', 'Perjanjian Renville', 'diplomasi', '17 Jan 1948', `
<p>Kesepakatan politik dan gencatan senjata yang ditandatangani <strong>17 Januari 1948</strong> di atas kapal perang Amerika Serikat <strong>USS Renville</strong> yang berlabuh di Teluk Jakarta. Dimediasi <strong>KTN</strong> (Amerika Serikat, Australia, Belgia), untuk menyelesaikan sengketa setelah Agresi Militer I dan kegagalan Linggarjati.</p>
<h3>Isi utama</h3>
<ol>
<li>Belanda hanya mengakui wilayah RI meliputi <strong>Jawa Tengah, Yogyakarta, dan Sumatra</strong>.</li>
<li>Disepakati garis batas wilayah RI dan daerah pendudukan Belanda: <strong>Garis Van Mook</strong>.</li>
<li>TNI harus ditarik dari kantong-kantong di Jawa Barat dan Jawa Timur, yang memicu <strong>Long March Siliwangi</strong>.</li>
<li>Akan dibentuk RIS dengan RI sebagai salah satu negara bagian, serta Uni Indonesia-Belanda.</li>
</ol>
<h3>Tokoh</h3>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Anggota</th></tr></thead><tbody>
<tr><td>Indonesia</td><td><strong>Amir Syarifuddin</strong> (Perdana Menteri, ketua), Ali Sastroamidjojo, H. Agus Salim, J. Leimena</td></tr>
<tr><td>Belanda</td><td><strong>R. Abdulkadir Wijoyoatmojo</strong> (ketua)</td></tr>
<tr><td>KTN</td><td>Frank B. Graham (Amerika Serikat), Richard C. Kirby (Australia), Paul van Zeeland (Belgia)</td></tr>
</tbody></table></div>
<h3>Dampak</h3>
<ul>
<li>Wilayah RI menjadi sangat kecil dan terjepit <strong>blokade ekonomi</strong> Belanda.</li>
<li>Rakyat kecewa, kabinet Amir Syarifuddin jatuh, dan muncul pemberontakan <strong>DI/TII Kartosuwiryo</strong> serta <strong>PKI Madiun 1948</strong>.</li>
</ul>`),

  S('b3', 'B.3', 'Perjanjian Roem-Royen', 'diplomasi', '7 Mei 1949', `
<p>Ditandatangani <strong>7 Mei 1949</strong> di <strong>Hotel Des Indes, Jakarta</strong>, di bawah pengawasan <strong>UNCI</strong>. Namanya diambil dari ketua kedua delegasi: <strong>Mr. Mohammad Roem</strong> (Indonesia) dan <strong>Dr. J.H. van Roijen</strong> (Belanda).</p>
<h3>Latar belakang</h3>
<ul>
<li>Agresi Militer II merebut Yogyakarta dan menawan para pemimpin.</li>
<li>Perlawanan gerilya, dengan puncaknya <strong>Serangan Umum 1 Maret 1949</strong>.</li>
<li>Kecaman dunia dan perintah gencatan senjata dari PBB.</li>
</ul>
<h3>Tokoh</h3>
<ul>
<li><strong>Indonesia:</strong> Mr. Mohammad Roem (ketua), Prof. Dr. Soepomo, Ali Sastroamidjojo, Dr. Johannes Leimena, A.K. Pringgodigdo, Johannes Latuharhary, didukung Mohammad Hatta dan Sri Sultan Hamengku Buwono IX.</li>
<li><strong>Belanda:</strong> Dr. J.H. van Roijen (ketua).</li>
<li><strong>Penengah (UNCI):</strong> Merle Cochran.</li>
</ul>
<h3>Isi perjanjian</h3>
<div class="table-scroll"><table><thead><tr><th>Indonesia bersedia</th><th>Belanda bersedia</th></tr></thead><tbody>
<tr><td>Menghentikan perang gerilya, bekerja sama menjaga keamanan, dan ikut KMB di Den Haag.</td><td>Mengembalikan pemerintah RI ke Yogyakarta, membebaskan semua tawanan tanpa syarat, mengakui RI dalam Negara Indonesia Serikat, dan menyetujui KMB.</td></tr>
</tbody></table></div>
<h3>Dampak</h3>
<ul>
<li>Pemerintah RI kembali ke Yogyakarta pada <strong>24 Juni 1949</strong>. Pasukan Belanda ditarik.</li>
<li>Para pemimpin kembali dari pengasingan pada <strong>6 Juli 1949</strong>.</li>
<li>Membuka jalan menuju KMB dan pengakuan kedaulatan.</li>
</ul>`),

  S('b4', 'B.4', 'Konferensi Inter-Indonesia', 'diplomasi', 'Jul – Agu 1949', `
<p>Pertemuan antara RI dan <strong>BFO</strong> (<em>Bijeenkomst voor Federaal Overleg</em>, Majelis Permusyawaratan Federal, berisi wakil negara-negara bagian bentukan Belanda). Tujuannya <strong>menyamakan sikap</strong> sebelum menghadapi Belanda di KMB.</p>
<div class="table-scroll"><table><thead><tr><th></th><th>Konferensi I</th><th>Konferensi II</th></tr></thead><tbody>
<tr><td>Waktu</td><td>19 &ndash; 22 Juli 1949</td><td>31 Juli &ndash; 3 Agustus 1949</td></tr>
<tr><td>Tempat</td><td>Yogyakarta (Hotel Tugu)</td><td>Jakarta (Gedung Volksraad, Pejambon)</td></tr>
<tr><td>Pemimpin sidang</td><td>Mohammad Hatta</td><td>Mohammad Hatta</td></tr>
</tbody></table></div>
<h3>Hasil Konferensi I</h3>
<ul>
<li>Negara yang dibentuk bernama <strong>Republik Indonesia Serikat (RIS)</strong>, berdasarkan demokrasi dan federalisme.</li>
<li>RIS dipimpin presiden konstitusional dibantu menteri-menteri.</li>
<li>Dua badan legislatif: <strong>DPR dan Senat</strong>.</li>
<li>RIS menerima kedaulatan dari Belanda maupun dari RI.</li>
<li><strong>APRIS</strong> menjadi angkatan perang nasional dengan TNI sebagai inti, ditambah unsur lain seperti KNIL.</li>
</ul>
<h3>Hasil Konferensi II</h3>
<ul>
<li>Simbol negara: bendera <strong>Sang Merah Putih</strong>, lagu kebangsaan <strong>Indonesia Raya</strong>, bahasa resmi <strong>Bahasa Indonesia</strong>.</li>
<li>Dibentuk <strong>Panitia Persiapan Nasional</strong> untuk persiapan teknis KMB.</li>
</ul>
<p class="inti"><strong>Tujuan:</strong> menggagalkan politik pecah belah (<em>devide et impera</em>) Belanda dan memperkuat posisi tawar RI dan BFO di KMB.</p>`),

  S('b5', 'B.5', 'Konferensi Meja Bundar (KMB)', 'diplomasi', '23 Agu – 2 Nov 1949', `
<p>Pertemuan antara RI, Kerajaan Belanda, dan BFO di <strong>Den Haag, Belanda</strong>, pada <strong>23 Agustus &ndash; 2 November 1949</strong>, dimediasi PBB melalui <strong>UNCI</strong>.</p>
<h3>Ketua delegasi</h3>
<div class="table-scroll"><table><thead><tr><th>Indonesia</th><th>Belanda</th><th>BFO</th></tr></thead><tbody>
<tr><td><strong>Drs. Mohammad Hatta</strong></td><td>Jan Herman van Maarseveen</td><td>Sultan Hamid II</td></tr>
</tbody></table></div>
<h3>Hasil utama</h3>
<ol>
<li>Belanda menyerahkan kedaulatan atas Indonesia kepada <strong>RIS</strong>. Penandatanganan resmi pada <strong>27 Desember 1949</strong>.</li>
<li>Indonesia menjadi negara serikat dengan <strong>16 negara bagian</strong>.</li>
<li>Dibentuk <strong>Uni Indonesia-Belanda</strong> yang longgar, berdasarkan kerja sama sukarela dan sederajat.</li>
<li>RIS menanggung utang Hindia Belanda sekitar <strong>4,3 miliar gulden</strong>.</li>
<li>Masalah <strong>Irian Barat (Papua Barat)</strong> ditunda dan akan dibicarakan <strong>satu tahun</strong> kemudian.</li>
</ol>
<figure class="fig"><img src="./assets/peta-ris.webp" alt="Peta negara-negara bagian Republik Indonesia Serikat" loading="lazy" decoding="async" width="709" height="333"><figcaption>Peta dalam modul: wilayah Republik Indonesia (merah) dan negara-negara bagian bentukan Belanda yang kemudian tergabung dalam RIS.</figcaption></figure>`),

  S('b6', 'B.6', 'Pengakuan Kedaulatan', 'diplomasi', '27 Des 1949', `
<p>Belanda menyerahkan dan mengakui kedaulatan Indonesia pada <strong>27 Desember 1949</strong>. Namun pengakuan bahwa Indonesia merdeka sejak 17 Agustus 1945 baru datang bertahun-tahun kemudian.</p>
<h3>Upacara 27 Desember 1949 (serentak di dua kota)</h3>
<div class="table-scroll"><table><thead><tr><th>Tempat</th><th>Pihak Belanda</th><th>Pihak Indonesia (RIS)</th></tr></thead><tbody>
<tr><td>Amsterdam</td><td>Ratu Juliana dan PM Willem Drees</td><td><strong>Mohammad Hatta</strong></td></tr>
<tr><td>Jakarta</td><td>Wakil Tinggi Mahkota A.H.J. Lovink</td><td><strong>Sri Sultan Hamengku Buwono IX</strong></td></tr>
</tbody></table></div>
<p>Wilayah RIS mencakup seluruh bekas Hindia Belanda kecuali Irian Barat.</p>
<h3>Pengakuan atas 17 Agustus 1945</h3>
<ul>
<li><strong>16 Agustus 2005:</strong> Menteri Luar Negeri Belanda <strong>Bernard Bot</strong> menerima secara politik dan moral bahwa Indonesia merdeka pada 17 Agustus 1945.</li>
<li><strong>14 Juni 2023:</strong> PM Belanda <strong>Mark Rutte</strong> menyatakan di depan parlemen bahwa Belanda mengakui sepenuhnya dan tanpa syarat (<em>zonder voorbehoud</em>) kemerdekaan Indonesia 17 Agustus 1945.</li>
</ul>
<p class="inti"><strong>Penyerahan atau pengakuan?</strong> Belanda menyebut 27 Desember 1949 sebagai &ldquo;penyerahan kedaulatan&rdquo;. Indonesia memaknainya sebagai &ldquo;pengakuan kedaulatan&rdquo;, karena kita sudah berdaulat sejak 17 Agustus 1945.</p>`),
];

/* ringkasan satu-dua kalimat untuk kartu di beranda */
const SUM: Record<string, string> = {
  a0: 'AFNEI tiba 29 September 1945 untuk urusan pascaperang, tetapi ikut membawa NICA. Dari sinilah ketegangan di berbagai daerah dimulai.',
  a1: 'Insiden Hotel Yamato, tewasnya Mallaby, lalu ultimatum Mansergh. Puncaknya 10 November 1945, kini Hari Pahlawan.',
  a2: 'Divisi Gajah I dan II dari Aceh bertempur di Medan Area. Pangkalan Berandan dibumihanguskan sebelum mundur ke Gebang.',
  a3: 'Kolonel Soedirman memukul mundur Sekutu dengan taktik supit urang. Letkol Isdiman gugur di sini.',
  a4: 'Lencana Merah Putih diinjak di Pension Wilhelmina, markas bekas KNIL pimpinan Westerling.',
  a5: 'Diultimatum mengosongkan kota sejauh 11 km, rakyat membakar Bandung Selatan. Sekitar satu juta orang mengungsi.',
  a6: 'Melawan Jepang, dipicu isu racun di tandon Siranda dan gugurnya dr. Kariadi. Monumennya Tugu Muda.',
  a7: 'Operatie Product mengincar perkebunan dan minyak. Dunia memprotes, masalah masuk DK PBB, dan lahir KTN.',
  a8: 'Operatie Kraai: Maguwo dibom, Yogyakarta jatuh, pemimpin diasingkan. PDRI berdiri dan KTN diganti UNCI.',
  b0: 'Tiga cara: mencari dukungan anggota PBB, membawa masalah ke Dewan Keamanan, dan berunding langsung dengan Belanda.',
  b1: 'Diakui de facto atas Jawa, Sumatra, dan Madura. Ditandatangani 25 Maret 1947, lalu dilanggar lewat Agresi I.',
  b2: 'Di atas kapal USS Renville. Wilayah RI tinggal Jawa Tengah, Yogyakarta, dan Sumatra, dibatasi Garis Van Mook.',
  b3: 'Gerilya dihentikan, pemerintah RI kembali ke Yogyakarta, dan kedua pihak sepakat ikut KMB.',
  b4: 'RI dan BFO menyamakan sikap sebelum KMB: sepakat membentuk RIS dan menetapkan simbol negara.',
  b5: 'Di Den Haag. Kedaulatan diserahkan kepada RIS, utang 4,3 miliar gulden ditanggung, dan Irian Barat ditunda.',
  b6: 'Upacara serentak di Amsterdam dan Jakarta. Belanda baru mengakui 17 Agustus 1945 sepenuhnya pada 2023.',
};
SECTIONS.forEach(s => { s.sum = SUM[s.id]; });

export const COURSE: Course = {
  chapters: [{
    id: 3,
    title: 'Strategi mempertahankan kemerdekaan',
    fullTitle: 'Strategi Mempertahankan Kemerdekaan',
    subtitle: '1945 – 1949',
    intro: 'Perjuangan fisik di berbagai daerah dan perjuangan diplomasi di meja perundingan.',
    example: '',
    translation: '',
    hero: 'ch-fisik',
    sections: SECTIONS,
    questions: QUESTIONS.map(q => q.id),
  }],
  questions: QUESTIONS,
  summary: 'Bab III Sejarah Indonesia Kelas XI: strategi mempertahankan kemerdekaan melalui perjuangan fisik dan diplomasi.',
  counts: { chapters: 1, sections: SECTIONS.length, questions: QUESTIONS.length },
};
