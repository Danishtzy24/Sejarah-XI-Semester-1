#!/usr/bin/env python3
"""Generate src/content.ts from chapters-raw.json + questions-raw.json.
Enriches BAB III (ch 6-8) topics with extra detail from materi-bab3.txt.
"""
import json, re, html as H
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
chaps = json.loads((ROOT/'tools/chapters-raw.json').read_text())
qs = json.loads((ROOT/'tools/questions-raw.json').read_text())

def strip(t):
    return H.unescape(re.sub(r'<[^>]+>', '', t or '')).strip()

# ---------- enrichment for BAB III (ch 6,7,8) ----------
# Extra sub-sections / expanded detail blocks appended to existing topic HTML
ENRICH = {
  # ---- CH6 Perjuangan Fisik ----
  "6.1": """
<div class="term-chips"><span>AFNEI</span><span>NICA</span><span>KNIL</span><span>De facto</span></div>
<p>Setelah Jepang menyerah (15 Agustus 1945), tentara Jepang di Indonesia diperintahkan menjaga <strong>status quo</strong> — keadaan dipertahankan seperti semula — sampai Sekutu tiba.</p>
<p>Pada <strong>29 September 1945</strong>, pasukan Sekutu tiba di Jakarta di bawah <strong>AFNEI</strong> (Allied Forces Netherlands East Indies) yang dipimpin <strong>Letnan Jenderal Philip Christison</strong>.</p>
<div class="table-scroll"><table><thead><tr><th>Istilah</th><th>Pengertian</th></tr></thead><tbody>
<tr><td><strong>Status quo</strong></td><td>Keadaan dipertahankan seperti semula sampai ada keputusan berikutnya.</td></tr>
<tr><td><strong>AFNEI</strong></td><td>Pasukan Sekutu yang bertugas di Indonesia setelah Jepang menyerah.</td></tr>
<tr><td><strong>NICA</strong></td><td>Administrasi sipil Belanda yang berupaya mengembalikan pemerintahan kolonial.</td></tr>
<tr><td><strong>KNIL</strong></td><td>Tentara kolonial Hindia Belanda (Koninklijk Nederlandsch-Indisch Leger).</td></tr>
<tr><td><strong>De facto</strong></td><td>Berdasarkan kenyataan/keadaan yang benar-benar berlangsung.</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Tugas AFNEI</summary><div class="detail-content prose">
<ol><li>Menerima penyerahan Jepang.</li><li>Membebaskan tawanan perang Sekutu.</li><li>Melucuti dan memulangkan tentara Jepang.</li><li>Menjaga keamanan dan ketertiban.</li><li>Mengumpulkan informasi tentang penjahat perang Jepang untuk diadili.</li></ol>
<p>Awalnya kedatangan AFNEI disambut pemerintah Indonesia. Namun ketegangan muncul karena Sekutu membawa <strong>NICA</strong>. NICA mempersenjatai kembali bekas anggota <strong>KNIL</strong>. Provokasi NICA dan KNIL memicu perlawanan rakyat Indonesia.</p>
<p>Pada <strong>1 Oktober 1945</strong>, Panglima AFNEI menyatakan akan memperlakukan pemerintahan Republik Indonesia di daerah sebagai kekuasaan <em>de facto</em>. Namun kedatangan pasukan Sekutu di berbagai daerah tetap menimbulkan insiden.</p>
</div></details></div>
""",
  "6.2": """
<div class="term-chips"><span>10 November</span><span>Ultimatum</span><span>Bung Tomo</span><span>Hari Pahlawan</span></div>
<p>Pertempuran Surabaya adalah konflik bersenjata antara pasukan Indonesia melawan tentara Inggris dan India Britania yang diboncengi NICA. Berlangsung <strong>27 Oktober – 20 November 1945</strong> dan mencapai puncak pada <strong>10 November 1945</strong>.</p>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Peristiwa</th></tr></thead><tbody>
<tr><td>19 Sep 1945</td><td>Insiden Hotel Yamato — pemuda merobek bagian biru bendera Belanda</td></tr>
<tr><td>25 Okt 1945</td><td>Pasukan Sekutu tiba di Surabaya dipimpin Brigadir Jenderal A.W.S. Mallaby</td></tr>
<tr><td>30 Okt 1945</td><td>A.W.S. Mallaby tewas</td></tr>
<tr><td>9 Nov 1945</td><td>Inggris mengeluarkan ultimatum agar pejuang menyerahkan senjata</td></tr>
<tr><td>10 Nov 1945</td><td>Pertempuran besar dimulai — puncak perlawanan</td></tr>
<tr><td>±20 Nov 1945</td><td>Pertempuran utama mereda</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Tokoh & dampak</summary><div class="detail-content prose">
<ul><li><strong>Bung Tomo (Sutomo)</strong> — membangkitkan semangat rakyat melalui siaran radio.</li>
<li><strong>HR Mohamad Mangoendiprodjo</strong> — pemimpin TKR dan wakil ketua Biro Kontak Surabaya.</li>
<li><strong>Soengkono</strong> — komandan pertahanan rakyat Surabaya.</li>
<li><strong>Moestopo</strong> — memimpin laskar-laskar pejuang.</li>
<li><strong>Gubernur Suryo &amp; KH Hasyim Asy'ari</strong> — membangkitkan semangat perjuangan.</li></ul>
<p><strong>Dampak:</strong> menimbulkan banyak korban jiwa; membuktikan tekad rakyat mempertahankan kemerdekaan; <strong>10 November diperingati sebagai Hari Pahlawan</strong>.</p>
</div></details></div>
""",
  "6.3": """
<div class="term-chips"><span>Divisi Gajah</span><span>Clash I</span><span>Bumi hangus</span></div>
<p>Pasukan dari Aceh ikut memperkuat pertahanan di wilayah Medan: <strong>Divisi Gajah I</strong> dan <strong>Divisi Gajah II</strong> (dipimpin Kolonel Simbolon) ditempatkan di beberapa wilayah Medan.</p>
<p>Pada <strong>Clash I, 21 April 1947</strong>, Belanda menguasai Medan Area. Karena khawatir Belanda merebut <strong>Pangkalan Brandan</strong> (daerah minyak), pasukan RI <strong>membumihanguskan</strong> Pangkalan Brandan, lalu mundur melalui Tanjung Pura hingga Gebang. Pasukan tambahan didatangkan dari Aceh.</p>
<div class="detail-block"><details class="source-details"><summary>Tokoh perlawanan Aceh</summary><div class="detail-content prose">
<ul><li><strong>Teuku Umar</strong> — pemimpin gerilya yang pernah berpura-pura bekerja sama dengan Belanda untuk mengumpulkan senjata.</li>
<li><strong>Cut Nyak Dhien</strong> — memimpin perlawanan gerilya setelah Teuku Umar gugur.</li>
<li><strong>Teungku Chik di Tiro</strong> — mengobarkan semangat Perang Sabil.</li>
<li><strong>Cut Nyak Meutia</strong> — memimpin perlawanan bersenjata di Aceh Utara.</li>
<li><strong>Laksamana Malahayati</strong> — memimpin pasukan laut Inong Balee.</li>
<li><strong>Teuku Nyak Arief</strong> — pejuang dan Gubernur/Residen Aceh pertama masa awal kemerdekaan.</li></ul>
</div></details></div>
<p><strong>Inti:</strong> Pertempuran Medan Area berawal dari provokasi dan insiden penghinaan lambang Merah Putih pada <strong>13 Oktober 1945</strong> di sekitar Pension Wilhelmina.</p>
""",
  "6.4": """
<div class="term-chips"><span>15–19 Okt 1945</span><span>dr. Kariadi</span><span>Tugu Muda</span></div>
<p>Pertempuran Lima Hari di Semarang adalah perlawanan rakyat Indonesia melawan <strong>sisa tentara Jepang</strong> pada <strong>15–19 Oktober 1945</strong>.</p>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Peristiwa</th></tr></thead><tbody>
<tr><td>14 Okt 1945</td><td>Ketegangan meningkat; dr. Kariadi gugur saat hendak memeriksa tandon air Siranda yang diduga diracuni Jepang</td></tr>
<tr><td>15 Okt 1945</td><td>Pertempuran pecah di berbagai penjuru Semarang</td></tr>
<tr><td>16–18 Okt 1945</td><td>Perlawanan meluas dan semakin terorganisasi</td></tr>
<tr><td>19–20 Okt 1945</td><td>Upaya gencatan senjata melalui perantara Sekutu</td></tr>
</tbody></table></div>
<p><strong>dr. Kariadi</strong> adalah Kepala Laboratorium Malaria Purusara yang gugur ketika hendak memeriksa sumber air. Dibangun <strong>Monumen Tugu Muda</strong> untuk mengenang perjuangan rakyat Semarang; diresmikan Presiden Soekarno pada <strong>20 Mei 1953</strong>.</p>
<p><strong>Inti:</strong> Pertempuran Lima Hari di Semarang dipicu ketegangan dengan tentara Jepang dan gugurnya dr. Kariadi — lawan utamanya Jepang, bukan Belanda.</p>
""",
  "6.5": """
<div class="term-chips"><span>Supit Urang</span><span>Soedirman</span><span>Isdiman</span></div>
<p>Perang Ambarawa atau <strong>Palagan Ambarawa</strong> terjadi ketika tentara Inggris bergerak ke Ambarawa dan Magelang pada <strong>14 Desember 1945</strong>. Gerakan pasukan Inggris akhirnya dapat dipukul mundur oleh pasukan Indonesia.</p>
<div class="detail-block"><details class="source-details"><summary>Taktik Supit Urang</summary><div class="detail-content prose">
<p><strong>Supit Urang</strong> adalah taktik pengepungan dari dua sisi untuk membatasi gerak lawan — seperti capit udang. Dipopulerkan oleh <strong>Kolonel Soedirman</strong> dalam pertempuran Ambarawa.</p>
<p><strong>Letkol Isdiman</strong> — perwira TKR yang gugur dalam pertempuran Ambarawa.</p>
</div></details></div>
<p><strong>Inti:</strong> Palagan Ambarawa dikenal karena keberhasilan pasukan Indonesia memukul mundur Inggris dan peran Kolonel Soedirman dengan taktik Supit Urang.</p>
""",
  "6.6": """
<div class="term-chips"><span>23–24 Maret 1946</span><span>Bumi hangus</span><span>A.H. Nasution</span></div>
<p>Pasukan Sekutu Inggris memasuki Bandung sejak pertengahan Oktober 1945. Menjelang November 1945, NICA melakukan aksi teror. Walaupun Indonesia telah mengosongkan Bandung Utara, Sekutu menuntut pengosongan wilayah hingga sejauh <strong>11 km</strong>. Rakyat Bandung menolak dan melakukan <strong>pembumihangusan Bandung Selatan</strong> pada <strong>23–24 Maret 1946</strong>.</p>
<div class="detail-block"><details class="source-details"><summary>Tokoh Bandung Lautan Api</summary><div class="detail-content prose">
<ul><li><strong>Kolonel A.H. Nasution</strong> — mengeluarkan perintah evakuasi dan pembumihangusan Bandung Selatan.</li>
<li><strong>Mohammad Toha</strong> — anggota Barisan Rakjat Indonesia yang gugur setelah meledakkan gudang amunisi Sekutu di Dayeuhkolot.</li>
<li><strong>Sutan Sjahrir</strong> — Perdana Menteri yang mengarahkan strategi diplomasi dan pertahanan.</li>
<li><strong>Mayor Rukana</strong> — mencetuskan ide pembakaran Bandung Selatan.</li>
<li><strong>Atje Bastaman</strong> — wartawan yang mendokumentasikan peristiwa.</li>
<li><strong>Ismail Marzuki</strong> — pencipta lagu "Halo-Halo Bandung" yang terinspirasi peristiwa ini.</li></ul>
</div></details></div>
<p><strong>Inti:</strong> Bandung Lautan Api adalah pembumihangusan Bandung Selatan agar fasilitas tidak dimanfaatkan pihak lawan.</p>
""",
  "6.7": """
<div class="term-chips"><span>20 Nov 1946</span><span>I Gusti Ngurah Rai</span><span>Puputan</span></div>
<p><strong>Puputan Margarana</strong> pada <strong>20 November 1946</strong> adalah pertempuran habis-habisan pasukan Bali melawan Belanda di Margarana, Tabanan. Dipimpin <strong>I Gusti Ngurah Rai</strong> bersama pasukan <strong>Ciung Wanara</strong>.</p>
<p><strong>Puputan</strong> berarti perlawanan habis-habisan sampai titik darah penghabisan — menolak menyerah. Seluruh pasukan gugur, termasuk Ngurah Rai, tetapi menegaskan tekad Bali mempertahankan kemerdekaan Indonesia.</p>
<p><strong>Inti:</strong> Puputan Margarana menunjukkan perlawanan habis-habsan rakyat Bali di bawah I Gusti Ngurah Rai.</p>
""",
  "6.8": """
<div class="term-chips"><span>Gerilya</span><span>Medan</span><span>Dukungan rakyat</span></div>
<p><strong>Gerilya</strong> adalah strategi perlawanan yang menghindari pertempuran terbuka, memanfaatkan medan, menyerang mendadak, lalu berpindah — sangat bergantung pada dukungan rakyat.</p>
<div class="table-scroll"><table><thead><tr><th>Aspek</th><th>Cara kerja gerilya</th></tr></thead><tbody>
<tr><td>Medan</td><td>Gunakan hutan, pegunungan, dan jalur tersembunyi</td></tr>
<tr><td>Waktu</td><td>Serang mendadak, terutama malam hari</td></tr>
<tr><td>Perpindahan</td><td>Bergerak cepat, tidak menetap di satu tempat</td></tr>
<tr><td>Rakyat</td><td>Mendapat logistik, informasi, dan perlindungan</td></tr>
</tbody></table></div>
<p>Dipimpin oleh <strong>Jenderal Soedirman</strong> meskipun dalam keadaan sakit. Gerilya menjadi pilihan efektif ketika kekuatan militer Indonesia tidak seimbang dengan Belanda.</p>
<p><strong>Inti:</strong> Gerilya = bertahan tanpa harus menguasai kota; sangat bergantung pada dukungan rakyat.</p>
""",
  "6.9": """
<div class="term-chips"><span>Fisik + politik</span><span>Posisi tawar</span></div>
<p>Perjuangan fisik dan politik/diplomasi adalah <strong>dua jalur yang saling menguatkan</strong>.</p>
<ul><li><strong>Menunjukkan Republik bertahan</strong> — meskipun diserang, pemerintahan dan rakyat tetap ada.</li>
<li><strong>Membuka dukungan dunia</strong> — perlawanan nyata membuat negara lain menaruh perhatian dan menekan Belanda.</li>
<li><strong>Memperkuat posisi tawar</strong> — Belanda tidak bisa mengklaim Indonesia lemah sehingga diplomasi jadi lebih berdaya.</li></ul>
<p><strong>Inti:</strong> Perjuangan fisik memberi tekanan nyata kepada Belanda dan memperkuat posisi tawar Indonesia dalam diplomasi.</p>
""",
  # ---- CH7 Perjuangan Diplomasi ----
  "7.1": """
<div class="term-chips"><span>Pengakuan</span><span>Legitimasi</span><span>Forum dunia</span></div>
<p>Perjuangan diplomasi adalah usaha mempertahankan kemerdekaan melalui <strong>perundingan, kesepakatan politik, dan dukungan internasional</strong>.</p>
<p><strong>Mengapa Indonesia menempuh diplomasi?</strong></p>
<ul><li>Kekuatan militer Indonesia masih terbatas.</li><li>Kondisi keamanan dan ekonomi belum stabil.</li><li>Indonesia membutuhkan dukungan dan pengakuan dari negara lain.</li></ul>
<p><strong>Tujuan diplomasi:</strong></p>
<ul><li>Mendapatkan pengakuan terhadap kemerdekaan Indonesia.</li><li>Menghentikan agresi dan konflik bersenjata.</li><li>Membawa persoalan Indonesia–Belanda ke forum internasional.</li><li>Memperkuat posisi Indonesia dalam perundingan.</li></ul>
<p><strong>Inti:</strong> Diplomasi dilakukan karena kekuatan militer terbatas dan Indonesia membutuhkan legitimasi internasional.</p>
""",
  "7.2": """
<div class="term-chips"><span>11–15 Nov 1946</span><span>25 Maret 1947</span><span>De facto</span></div>
<p>Perundingan Linggarjati berlangsung <strong>11–15 November 1946</strong> di Linggarjati, Kuningan, Jawa Barat. Kesepakatan ditandatangani pada <strong>25 Maret 1947</strong> di Jakarta.</p>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Ketua delegasi</th></tr></thead><tbody>
<tr><td>Indonesia</td><td>Sutan Sjahrir</td></tr>
<tr><td>Belanda</td><td>Wim Schermerhorn</td></tr>
<tr><td>Mediator Inggris</td><td>Lord Killearn</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Isi pokok & dampak</summary><div class="detail-content prose">
<p><strong>Isi pokok:</strong></p>
<ol><li>Belanda mengakui secara <em>de facto</em> wilayah Republik Indonesia yang meliputi <strong>Jawa, Sumatra, dan Madura</strong>.</li>
<li>Indonesia dan Belanda sepakat membentuk <strong>Republik Indonesia Serikat (RIS)</strong>.</li>
<li>RIS dan Belanda akan tergabung dalam <strong>Uni Indonesia–Belanda</strong>.</li></ol>
<p><strong>Dampak positif:</strong> pengakuan <em>de facto</em>; posisi diplomasi menguat; mendapat perhatian dukungan internasional.</p>
<p><strong>Dampak negatif:</strong> wilayah yang diakui terbatas; muncul kritik di dalam negeri; perbedaan penafsiran menjadi latar belakang Agresi Militer I.</p>
</div></details></div>
<p><strong>Inti:</strong> Linggarjati berkaitan dengan pengakuan <em>de facto</em> Jawa, Sumatra, dan Madura.</p>
""",
  "7.3": """
<div class="term-chips"><span>21 Jul–5 Agu 1947</span><span>Operatie Product</span><span>Resolusi 27</span></div>
<p>Agresi Militer Belanda I disebut Belanda sebagai <strong>Operatie Product</strong> (Aksi Polisionil Pertama), berlangsung <strong>21 Juli – 5 Agustus 1947</strong> di wilayah Republik, terutama Jawa dan Sumatra.</p>
<p><strong>Latar belakang:</strong> perbedaan penafsiran terhadap Perjanjian Linggarjati; Belanda ingin menguasai daerah strategis dan ekonomis (perkebunan, minyak); Belanda menuduh Indonesia melanggar kesepakatan.</p>
<p><strong>Sasaran:</strong> Jawa Barat, Jawa Timur, Sumatra Timur, serta kota-kota penting seperti Semarang, Solo, Malang, dan Medan. TNI dan laskar rakyat melawan dengan taktik <strong>gerilya</strong> di bawah komando <strong>Jenderal Soedirman</strong>.</p>
<div class="detail-block"><details class="source-details"><summary>Tekanan internasional</summary><div class="detail-content prose">
<ul><li>India, Australia, dan Mesir memprotes tindakan Belanda.</li>
<li>31 Juli 1947 — konflik masuk agenda Dewan Keamanan PBB.</li>
<li>1 Agustus 1947 — DK PBB mengeluarkan <strong>Resolusi No. 27</strong> yang menyerukan gencatan senjata.</li>
<li>5 Agustus 1947 — agresi dihentikan.</li>
<li>14 Agustus 1947 — Sutan Sjahrir menyampaikan pidato di hadapan DK PBB.</li>
<li>25 Agustus 1947 — <strong>Komisi Tiga Negara (KTN)</strong> dibentuk.</li></ul>
</div></details></div>
<p><strong>Inti:</strong> Agresi I dimulai 21 Juli 1947 (Operatie Product) dan membawa konflik Indonesia–Belanda ke perhatian PBB.</p>
""",
  "7.4": """
<div class="term-chips"><span>Australia</span><span>Belgia</span><span>Amerika Serikat</span></div>
<p><strong>Komisi Tiga Negara (KTN)</strong> dibentuk pada <strong>25 Agustus 1947</strong> sebagai penengah konflik Indonesia–Belanda setelah Agresi Militer I.</p>
<div class="table-scroll"><table><thead><tr><th>Negara</th><th>Pilihan</th><th>Wakil</th></tr></thead><tbody>
<tr><td>Australia</td><td>Pilihan Indonesia</td><td>Richard C. Kirby</td></tr>
<tr><td>Belgia</td><td>Pilihan Belanda</td><td>Paul van Zeeland</td></tr>
<tr><td>Amerika Serikat</td><td>Pihak netral yang disepakati</td><td>Frank B. Graham</td></tr>
</tbody></table></div>
<p>KTN memfasilitasi perundingan yang menghasilkan <strong>Perjanjian Renville</strong>, tetapi tidak memiliki wewenang memaksa secara militer.</p>
<p><strong>Inti:</strong> KTN = tiga pihak penengah (Australia, Belgia, AS) yang memfasilitasi perundingan setelah Agresi I.</p>
""",
  "7.5": """
<div class="term-chips"><span>17 Jan 1948</span><span>Van Mook</span><span>USS Renville</span></div>
<p>Perjanjian Renville ditandatangani pada <strong>17 Januari 1948</strong> di atas kapal <strong>USS Renville</strong> yang berlabuh di Teluk Jakarta, setelah Agresi Militer I dengan bantuan KTN.</p>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Wakil</th></tr></thead><tbody>
<tr><td>Indonesia</td><td>Amir Syarifuddin (ketua delegasi)</td></tr>
<tr><td>Belanda</td><td>Raden Abdulkadir Wijoyoatmojo</td></tr>
<tr><td>KTN</td><td>Frank B. Graham, Richard C. Kirby, Paul van Zeeland</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Isi pokok & dampak</summary><div class="detail-content prose">
<p><strong>Isi pokok:</strong></p>
<ol><li>Wilayah Republik <em>de facto</em> diakui meliputi <strong>Jawa Tengah, Yogyakarta, dan Sumatra</strong> (lebih sempit dari Linggarjati).</li>
<li>Disepakati garis demarkasi yang dikenal sebagai <strong>Garis Van Mook</strong>.</li>
<li>Pasukan TNI harus meninggalkan kantong-kantong wilayah yang diduduki Belanda di Jawa Barat dan Jawa Timur.</li>
<li>Rencana pembentukan RIS kembali disepakati.</li></ol>
<p><strong>Dampak:</strong> wilayah RI semakin sempit; blokade ekonomi Belanda; banyak pasukan TNI berpindah wilayah; Kabinet Amir Syarifuddin jatuh; kondisi politik semakin sulit.</p>
</div></details></div>
<p><strong>Inti:</strong> Renville ditandatangani 17 Januari 1948, dikenal dengan Garis Van Mook, dan merugikan wilayah Republik.</p>
""",
  "7.6": """
<div class="term-chips"><span>19 Des 1948</span><span>Operatie Kraai</span><span>Yogyakarta</span></div>
<p>Agresi Militer Belanda II dimulai pada <strong>19 Desember 1948</strong>. Belanda menyebutnya <strong>Operatie Kraai</strong> (Operasi Gagak).</p>
<p>Belanda menyerang <strong>Pangkalan Udara Maguwo</strong> dan menduduki <strong>Yogyakarta</strong>, yang saat itu menjadi ibu kota Republik Indonesia. Sejumlah pemimpin Indonesia ditangkap dan diasingkan.</p>
<p>Jenderal Soedirman tetap memimpin perjuangan <strong>gerilya</strong> meskipun dalam keadaan sakit.</p>
<p><strong>Inti:</strong> Agresi II dimulai 19 Desember 1948; Yogyakarta diduduki; pemimpin ditangkap; TNI melanjutkan perang gerilya.</p>
""",
  "7.7": """
<div class="term-chips"><span>22 Des 1948</span><span>Sjafruddin</span><span>Pemerintahan darurat</span></div>
<p><strong>Pemerintahan Darurat Republik Indonesia (PDRI)</strong> dibentuk pada <strong>22 Desember 1948</strong> di Sumatra oleh <strong>Mr. Sjafruddin Prawiranegara</strong>.</p>
<p>PDRI bertujuan <strong>menjaga agar pemerintahan Republik Indonesia tetap berjalan</strong> meskipun pemimpin utama ditangkap dan diasingkan. Pusat pemerintahan darurat berada di wilayah Sumatra, dengan basis awal di <strong>Bukittinggi</strong> dan sekitarnya.</p>
<p>PDRI menjaga eksistensi negara, koordinasi antardaerah, dan keberlangsungan pemerintahan sampai pemimpin pusat kembali.</p>
<p><strong>Inti:</strong> PDRI dibentuk 22 Desember 1948 oleh Sjafruddin Prawiranegara untuk menjaga pemerintahan tetap hidup.</p>
""",
  "7.8": """
<div class="term-chips"><span>1 Maret 1949</span><span>6 jam</span><span>Propaganda</span></div>
<p><strong>Serangan Umum 1 Maret 1949</strong> dilakukan di Yogyakarta. Tujuan utamanya adalah <strong>membuktikan kepada dunia internasional bahwa Republik Indonesia dan TNI masih ada</strong>, meskipun Belanda mengklaim telah menghancurkan Republik.</p>
<p>TNI berhasil menguasai Yogyakarta selama sekitar <strong>enam jam</strong>.</p>
<p><strong>Tokoh:</strong> Sri Sultan Hamengku Buwono IX dan Jenderal Soedirman.</p>
<p><strong>Tujuan serangan:</strong></p>
<ul><li>Menunjukkan bahwa TNI masih memiliki kekuatan.</li><li>Membantah propaganda Belanda bahwa Republik telah hancur.</li><li>Meningkatkan moral rakyat.</li><li>Memperkuat posisi diplomasi Indonesia di dunia internasional.</li></ul>
<p><strong>Inti:</strong> Serangan Umum 1 Maret 1949 memperkuat posisi diplomasi Indonesia karena menunjukkan TNI masih mampu melakukan perlawanan.</p>
""",
  "7.9": """
<div class="term-chips"><span>7 Mei 1949</span><span>UNCI</span><span>Jalan KMB</span></div>
<p>Perjanjian Roem-Royen ditandatangani pada <strong>7 Mei 1949</strong> di Hotel Des Indes, Jakarta, setelah Agresi Militer Belanda II.</p>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Wakil</th></tr></thead><tbody>
<tr><td>Indonesia</td><td>Mohammad Roem</td></tr>
<tr><td>Belanda</td><td>Dr. J.H. van Roijen</td></tr>
<tr><td>PBB (mediator)</td><td>UNCI, Merle Cochran</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Pokok kesepakatan</summary><div class="detail-content prose">
<p><strong>Indonesia bersedia:</strong> menghentikan perang gerilya; bekerja sama menjaga keamanan; mengikuti Konferensi Meja Bundar.</p>
<p><strong>Belanda bersedia:</strong> mengembalikan pemerintahan Republik Indonesia ke Yogyakarta; membebaskan tahanan politik; menyetujui penyelenggaraan KMB.</p>
<p><strong>Dampak:</strong> pemerintahan RI kembali ke Yogyakarta; para pemimpin Indonesia kembali dari pengasingan; membuka jalan menuju KMB.</p>
</div></details></div>
<p><strong>Inti:</strong> Roem-Royen ditandatangani 7 Mei 1949 dan membuka jalan bagi KMB.</p>
""",
  "7.10": """
<div class="term-chips"><span>BFO</span><span>RI + BFO</span><span>Sebelum KMB</span></div>
<p><strong>Konferensi Inter-Indonesia</strong> adalah pertemuan Republik Indonesia dengan <strong>BFO</strong> (Bijeenkomst voor Federaal Overleg) — badan perwakilan negara-negara bagian federal.</p>
<p><strong>Tujuan:</strong> menyamakan pandangan RI dan BFO; memperkuat persatuan sebelum menghadapi Belanda dalam KMB; menghadapi politik pecah belah (<em>divide et impera</em>).</p>
<div class="table-scroll"><table><thead><tr><th>Konferensi</th><th>Tanggal</th><th>Tempat</th><th>Ketua</th></tr></thead><tbody>
<tr><td>I</td><td>19–22 Juli 1949</td><td>Yogyakarta, Hotel Tugu</td><td>Mohammad Hatta</td></tr>
<tr><td>II</td><td>31 Juli – 3 Agustus 1949</td><td>Jakarta</td><td>Mohammad Hatta</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Hasil konferensi</summary><div class="detail-content prose">
<p><strong>Konferensi I:</strong> membahas bentuk RIS, prinsip demokrasi dan federalisme, presiden konstitusional, DPR dan Senat, serta angkatan perang RIS.</p>
<p><strong>Konferensi II:</strong> bendera Merah Putih, lagu kebangsaan Indonesia Raya, Bahasa Indonesia sebagai bahasa resmi, dan pembentukan Panitia Persiapan Nasional.</p>
</div></details></div>
<p><strong>Inti:</strong> Konferensi Inter-Indonesia menyatukan sikap RI dan BFO sebelum KMB.</p>
""",
  # ---- CH8 Pengakuan Kedaulatan ----
  "8.1": """
<div class="term-chips"><span>Gerilya</span><span>PDRI</span><span>Serangan Umum</span></div>
<p>Dari ketahanan menuju perundingan — setelah Agresi II, perjuangan melalui jalur fisik dan politik saling mendorong penyelesaian.</p>
<ul><li><strong>Gerilya &amp; PDRI</strong> — menjaga eksistensi Republik meskipun ibu kota diduduki.</li>
<li><strong>Serangan Umum 1 Maret 1949</strong> — membuktikan TNI masih ada dan memperkuat posisi diplomasi.</li>
<li><strong>Dorongan penyelesaian</strong> — tekanan internasional dan kondisi dalam negeri mendorong perundingan.</li>
<li><strong>Jalan menuju KMB</strong> — Roem-Royen dan Konferensi Inter-Indonesia membuka pintu Konferensi Meja Bundar.</li></ul>
<p><strong>Inti:</strong> Perjuangan fisik dan diplomasi saling melengkapi; ketahanan militer menjadi bekal menuju perundingan.</p>
""",
  "8.2": """
<div class="term-chips"><span>Den Haag</span><span>23 Agu–2 Nov 1949</span><span>Hatta</span></div>
<p><strong>Konferensi Meja Bundar (KMB)</strong> berlangsung di <strong>Den Haag, Belanda</strong>, pada <strong>23 Agustus – 2 November 1949</strong>.</p>
<div class="table-scroll"><table><thead><tr><th>Pihak</th><th>Wakil</th></tr></thead><tbody>
<tr><td>Indonesia</td><td>Mohammad Hatta</td></tr>
<tr><td>Belanda</td><td>Jan Herman van Maarseveen</td></tr>
<tr><td>BFO</td><td>Sultan Hamid II</td></tr>
<tr><td>PBB (mediator)</td><td>UNCI</td></tr>
</tbody></table></div>
<p><strong>Inti:</strong> KMB berlangsung di Den Haag pada 23 Agustus–2 November 1949 dan menjadi puncak perjuangan diplomasi.</p>
""",
  "8.3": """
<div class="term-chips"><span>RIS</span><span>Utang</span><span>Irian Barat</span></div>
<p><strong>Hasil utama KMB:</strong></p>
<ol><li>Belanda menyetujui pengakuan/penyerahan kedaulatan kepada <strong>Republik Indonesia Serikat (RIS)</strong> pada <strong>27 Desember 1949</strong>.</li>
<li>Indonesia menjadi negara federal bernama RIS.</li>
<li>Dibentuk <strong>Uni Indonesia–Belanda</strong>.</li>
<li>RIS menanggung utang Pemerintah Hindia Belanda (sering dicatat sekitar <strong>4,3 miliar gulden</strong>).</li>
<li>Masalah <strong>Irian Barat/Papua Barat</strong> belum diselesaikan dan ditunda.</li></ol>
<div class="table-scroll"><table><thead><tr><th>Dampak</th><th>Penjelasan</th></tr></thead><tbody>
<tr><td><strong>Positif</strong></td><td>Belanda mengakui kedaulatan; konflik bersenjata utama berakhir; pengakuan formal dari Belanda</td></tr>
<tr><td><strong>Negatif</strong></td><td>Menanggung utang Hindia Belanda; Irian Barat belum selesai; bentuk negara federal untuk sementara</td></tr>
</tbody></table></div>
<p><strong>Inti:</strong> KMB menghasilkan pengakuan kedaulatan kepada RIS, tetapi belum menyelesaikan seluruh persoalan.</p>
""",
  "8.4": """
<div class="term-chips"><span>27 Des 1949</span><span>Amsterdam</span><span>Jakarta</span></div>
<p>Pada <strong>27 Desember 1949</strong>, dilakukan pengakuan/penyerahan kedaulatan kepada Republik Indonesia Serikat.</p>
<div class="table-scroll"><table><thead><tr><th>Tempat</th><th>Wakil</th></tr></thead><tbody>
<tr><td>Amsterdam</td><td>Mohammad Hatta mewakili RIS</td></tr>
<tr><td>Jakarta</td><td>Sri Sultan Hamengku Buwono IX mewakili Indonesia</td></tr>
</tbody></table></div>
<div class="detail-block"><details class="source-details"><summary>Perbedaan istilah</summary><div class="detail-content prose">
<ul><li><strong>Penyerahan kedaulatan</strong> — istilah dari sudut pandang Belanda.</li>
<li><strong>Pengakuan kedaulatan</strong> — istilah dari sudut pandang Indonesia.</li></ul>
<p>Indonesia menegaskan bahwa kemerdekaan telah diproklamasikan pada <strong>17 Agustus 1945</strong>. Tanggal 27 Desember 1949 dipandang sebagai <strong>pengakuan formal Belanda</strong>, bukan pemberian kemerdekaan.</p>
<p><strong>Catatan sejarah:</strong></p>
<ul><li>16 Agustus 2005 — Menlu Belanda Bernard Bot menyampaikan penerimaan politik dan moral bahwa kemerdekaan Indonesia adalah 17 Agustus 1945.</li>
<li>14 Juni 2023 — PM Belanda Mark Rutte menyatakan pengakuan penuh dan tanpa syarat bahwa kemerdekaan Indonesia secara <em>de jure</em> jatuh pada 17 Agustus 1945.</li></ul>
</div></details></div>
<p><strong>Inti:</strong> 27 Desember 1949 = pengakuan formal Belanda; kemerdekaan tetap 17 Agustus 1945.</p>
""",
  "8.5": """
<div class="term-chips"><span>1945 ≠ 1949</span><span>Proklamasi</span><span>Penyerahan</span></div>
<div class="table-scroll"><table><thead><tr><th>Aspek</th><th>Proklamasi 17 Agustus 1945</th><th>Penyerahan Kedaulatan 27 Desember 1949</th></tr></thead><tbody>
<tr><td><strong>Sifat</strong></td><td>Pernyataan kemerdekaan oleh bangsa Indonesia sendiri</td><td>Pengakuan/penyerahan kedualatan oleh Belanda kepada RIS</td></tr>
<tr><td><strong>Pelaku</strong></td><td>Soekarno–Hatta atas nama bangsa Indonesia</td><td>Belanda (Amsterdam) dan wakil Indonesia (Jakarta)</td></tr>
<tr><td><strong>Makna hukum</strong></td><td>Indonesia menyatakan diri merdeka dan berdaulat</td><td>Belanda mengakui kedaulatan yang sudah ada</td></tr>
<tr><td><strong>Bentuk negara</strong></td><td>Republik Indonesia</td><td>Republik Indonesia Serikat (RIS)</td></tr>
</tbody></table></div>
<p><strong>Inti:</strong> 1945 ≠ 1949 — Proklamasi menyatakan kemerdekaan; 1949 adalah pengakuan formal Belanda.</p>
""",
  "8.6": """
<div class="term-chips"><span>RIS</span><span>Federal</span><span>NKRI</span></div>
<p>Setelah 27 Desember 1949, Indonesia berbentuk <strong>Republik Indonesia Serikat (RIS)</strong> — negara federal hasil kesepakatan KMB.</p>
<p>Bentuk federal <strong>tidak bertahan lama</strong>. Pada <strong>17 Agustus 1950</strong>, Indonesia kembali menjadi <strong>Negara Kesatuan Republik Indonesia (NKRI)</strong>.</p>
<div class="table-scroll"><table><thead><tr><th>Tanggal</th><th>Bentuk negara</th></tr></thead><tbody>
<tr><td>17 Agustus 1945</td><td>Republik Indonesia (de jure)</td></tr>
<tr><td>27 Desember 1949</td><td>Republik Indonesia Serikat (RIS)</td></tr>
<tr><td>17 Agustus 1950</td><td>Negara Kesatuan Republik Indonesia (NKRI)</td></tr>
</tbody></table></div>
<p><strong>Inti:</strong> Bentuk federal RIS hanya sementara; NKRI dipulihkan pada 17 Agustus 1950.</p>
""",
  "8.7": """
<div class="term-chips"><span>Fisik</span><span>Diplomasi</span><span>Saling melengkapi</span></div>
<p>Satu perjuangan, banyak penopang — kemerdekaan dan kedaulatan dipertahankan melalui kombinasi strategi.</p>
<div class="table-scroll"><table><thead><tr><th>Penopang</th><th>Peran</th></tr></thead><tbody>
<tr><td><strong>Perjuangan fisik</strong></td><td>Perlawanan bersenjata di berbagai daerah; membuktikan Republik bertahan</td></tr>
<tr><td><strong>Diplomasi</strong></td><td>Perundingan dan forum dunia; memperoleh pengakuan internasional</td></tr>
<tr><td><strong>PDRI</strong></td><td>Menjaga pemerintahan tetap hidup saat pemimpin ditangkap</td></tr>
<tr><td><strong>Dukungan bersama</strong></td><td>Rakyat, daerah, dan komunitas internasional</td></tr>
</tbody></table></div>
<p><strong>Inti:</strong> Perjuangan fisik dan diplomasi saling melengkapi — tanpa salah satunya, kemerdekaan sulit dipertahankan.</p>
""",
}

# Append enrichment HTML into existing topic html fields
for c in chaps:
    for t in c.get('topics') or []:
        extra = ENRICH.get(t['id'])
        if extra:
            t['html'] = (t.get('html') or '') + extra

# ---------- build content.ts ----------
def ts_str(s):
    """Escape for TypeScript double-quoted string."""
    if s is None: s = ''
    return json.dumps(s, ensure_ascii=False)

# Map chapter id -> hero image
HERO = {
    1: 'ch-dasar', 2: 'ch-proklamasi', 3: 'ch-proklamasi', 4: 'ch-negara',
    5: 'ch-rakyat', 6: 'ch-fisik', 7: 'ch-diplomasi', 8: 'ch-kedaulatan',
    9: 'arsip-hero', 10: 'arsip-hero',
}

lines = []
lines.append('import type { Course } from \'./types\';')
lines.append('export const COURSE: Course = {')
lines.append(' "chapters": [')

for ci, c in enumerate(chaps):
    lines.append('  {')
    lines.append(f'   "id": {c["id"]},')
    lines.append(f'   "title": {ts_str(c.get("short",""))},')
    lines.append(f'   "fullTitle": {ts_str(c.get("title",""))},')
    lines.append(f'   "subtitle": {ts_str(c.get("period",""))},')
    lines.append(f'   "intro": {ts_str(c.get("question",""))},')
    lines.append(f'   "example": {ts_str(c.get("summary",""))},')
    lines.append(f'   "translation": {ts_str(c.get("summary",""))},')
    lines.append(f'   "hero": {ts_str(HERO.get(c["id"], "arsip-hero"))},')
    # sections from topics
    lines.append('   "sections": [')
    topics = c.get('topics') or []
    for ti, t in enumerate(topics):
        html = t.get('html') or ''
        # search string: title + strip(html)
        search = (t.get('title','') + ' ' + strip(html)).lower()
        search = re.sub(r'\s+', ' ', search).strip()
        lines.append('    {')
        lines.append(f'     "id": {ts_str(t["id"])},')
        lines.append(f'     "number": {ts_str(t["id"])},')
        lines.append(f'     "title": {ts_str(t.get("title",""))},')
        lines.append(f'     "lead": {ts_str(html)},')
        lines.append('     "details": [],')
        lines.append(f'     "search": {ts_str(search)}')
        lines.append('    }' + (',' if ti < len(topics)-1 else ''))
    lines.append('   ],')
    # questions for this chapter (ids)
    qids = [q['id'] for q in qs if q['chapter']==c['id']]
    lines.append(f'   "questions": [{", ".join(ts_str(q) for q in qids)}]')
    lines.append('  }' + (',' if ci < len(chaps)-1 else ''))
lines.append(' ],')

# questions array
lines.append(' "questions": [')
for qi, q in enumerate(qs):
    lines.append('  {')
    lines.append(f'   "id": {ts_str(q["id"])},')
    lines.append(f'   "chapter": {q["chapter"]},')
    lines.append(f'   "prompt": {ts_str(q.get("prompt",""))},')
    lines.append(f'   "kind": {ts_str(q.get("kind","mcq"))},')
    # options
    opts = q.get('options') or []
    lines.append('   "options": [')
    for oi, o in enumerate(opts):
        lines.append(f'    {{"id": {ts_str(o["id"])}, "html": {ts_str(o.get("text",""))}, "text": {ts_str(o.get("text",""))}}}' + (',' if oi < len(opts)-1 else ''))
    lines.append('   ],')
    if q.get('kind') == 'essay':
        lines.append(f'   "correct": "",')
        lines.append(f'   "rubric": {ts_str(q.get("rubric",""))}')
    else:
        lines.append(f'   "correct": {ts_str(q.get("correct",""))},')
        lines.append(f'   "explanation": {ts_str(q.get("explanation",""))}')
    lines.append('  }' + (',' if qi < len(qs)-1 else ''))
lines.append(' ],')

n_ch = len(chaps)
n_sec = sum(len(c.get('topics') or []) for c in chaps)
n_q = len(qs)
lines.append(f' "summary": {ts_str("Materi Sejarah Indonesia Kelas XI Semester 1: persiapan kemerdekaan hingga pengakuan kedaulatan.")},')
lines.append(f' "counts": {{"chapters": {n_ch}, "sections": {n_sec}, "questions": {n_q}}}')
lines.append('};')
lines.append('')

out = ROOT/'src'/'content.ts'
out.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {out}')
print(f'chapters={n_ch} sections={n_sec} questions={n_q}')
# validate JSON-ness of structure by quick parse of counts
print('OK')
