# Ringkasan Portofolio

Menampilkan ringkasan total berat emas, nilai investasi, dan estimasi untung/rugi pada layar utama.

## Spesifikasi

### Tujuan
Menampilkan ringkasan kondisi portofolio emas pengguna di layar utama, sehingga sekali buka aplikasi ia langsung tahu berapa berat emas yang dimiliki, berapa uang yang sudah dikeluarkan, dan apakah investasinya sedang untung atau rugi.

### Selesai bila
- Layar utama menampilkan total berat emas (gram) dan total nilai investasi (rupiah) hasil akumulasi seluruh transaksi yang tersimpan.
- Angka rupiah tampil dengan format yang mudah dibaca (pemisah ribuan dan keterangan "Rp"), dan berat tampil dengan satuan gram.
- Estimasi untung/rugi portofolio tampil di layar utama dengan penanda jelas apakah sedang untung atau rugi.
- Harga emas terkini tampil di layar utama beserta keterangan waktu pembaruannya.
- Banner iklan tampil pada area yang sudah ditentukan di layar utama tanpa menutupi informasi ringkasan.
- Saat belum ada transaksi tersimpan, ringkasan menampilkan nilai nol/kosong yang wajar, bukan angka error atau layar kosong.

## Sub-fitur: Total Berat & Nilai

Menampilkan akumulasi berat emas dan nilai total investasi yang tersimpan.

### Tujuan
Menampilkan akumulasi berat emas dan total nilai investasi pengguna di layar utama sebagai gambaran cepat isi portofolionya.

### Selesai bila
- Layar utama menampilkan total berat emas dalam gram dan total nilai investasi dalam rupiah dari seluruh transaksi tersimpan.
- Angka rupiah tampil dengan pemisah ribuan dan awalan "Rp", sedangkan berat memakai satuan gram.
- Jika belum ada transaksi, kedua angka tampil sebagai nol tanpa error.

## Sub-fitur: Estimasi Untung/Rugi

Menghitung perkiraan keuntungan atau kerugian portofolio berdasarkan harga pasar terkini.

### Tujuan
Menunjukkan perkiraan untung atau rugi portofolio dengan membandingkan total nilai investasi terhadap harga emas pasar terkini.

### Selesai bila
- Layar utama menampilkan angka estimasi untung/rugi beserta penanda visual jelas (mis. warna hijau untuk untung, merah untuk rugi).
- Nilai estimasi mengikuti harga emas terkini yang sedang ditampilkan di beranda.
- Bila harga pasar belum tersedia, bagian ini menampilkan keterangan bahwa estimasi belum bisa dihitung, bukan angka menyesatkan.

## Sub-fitur: Harga Emas di Beranda

Memuat dan menampilkan harga emas terkini langsung di halaman utama.

### Tujuan
Memuat harga emas pasar terkini dan menampilkannya langsung di layar utama agar pengguna bisa memantau nilainya tanpa berpindah halaman.

### Selesai bila
- Layar utama menampilkan harga emas terkini dalam rupiah.
- Tampil keterangan waktu pembaruan terakhir harga tersebut.
- Bila harga gagal dimuat, beranda menampilkan status gagal muat atau nilai cadangan yang jelas, bukan pesan error mentah.

## Sub-fitur: Banner Iklan

Menampilkan banner iklan AdMob di area yang sudah ditentukan pada halaman utama.

### Tujuan
Menampilkan banner iklan AdMob pada area yang sudah ditentukan di layar utama sebagai sumber pendapatan aplikasi tanpa mengganggu keterbacaan ringkasan.

### Selesai bila
- Banner iklan tampil pada posisi yang sudah ditentukan di layar utama.
- Banner tidak menutupi atau mendorong keluar informasi total berat, nilai investasi, dan estimasi untung/rugi.
- Bila iklan gagal dimuat, area banner tetap rapi dan tidak menampilkan ruang kosong yang mengganggu tata letak.
