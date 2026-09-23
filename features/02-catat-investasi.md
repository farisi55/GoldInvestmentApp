# Catat Investasi

Membantu pengguna mencatat transaksi pembelian emas baru lengkap dengan tanggal dan nominalnya.

## Spesifikasi

### Tujuan
Menyediakan satu layar sederhana bagi pengguna untuk mencatat setiap pembelian emas baru (tanggal, berat dalam gram, dan nominal rupiah) agar seluruh investasi tercatat rapi tanpa perlu kertas atau spreadsheet.

### Selesai bila
- Pengguna dapat membuka layar "Catat Investasi" dari beranda dan mengisi tanggal, berat emas, serta nilai investasi.
- Nilai atau berat emas yang belum diisi terhitung otomatis dari angka pasangannya, sehingga pengguna tidak perlu menghitung manual.
- Angka yang tidak lengkap atau salah format ditolak dengan pesan yang jelas sebelum data disimpan.
- Setelah transaksi berhasil disimpan, pengguna kembali ke beranda dan data baru langsung terlihat pada ringkasan portofolio.
- Transaksi yang disimpan tetap ada saat aplikasi ditutup dan dibuka kembali tanpa koneksi internet.

## Sub-fitur: Pilih Tanggal

Memilih tanggal transaksi pembelian emas melalui pemilih tanggal.

### Tujuan
Memudahkan pengguna menetapkan tanggal terjadinya pembelian emas, tanpa perlu mengetik tanggal secara manual.

### Selesai bila
- Pengguna dapat membuka pemilih tanggal dan memilih tanggal transaksi.
- Tanggal yang dipilih tampil dengan format yang mudah dibaca dan tersimpan bersama transaksi.
- Jika pengguna belum memilih tanggal, transaksi tidak bisa disimpan.

## Sub-fitur: Input Berat Emas

Memasukkan berat emas yang dibeli dalam satuan gram.

### Tujuan
Memungkinkan pengguna memasukkan berat emas yang dibeli dalam satuan gram.

### Selesai bila
- Tersedia kolom angka untuk mengisi berat emas dengan satuan gram yang terlihat jelas.
- Hanya nilai berat yang wajar (angka positif) yang diterima; huruf atau angka minus ditolak.
- Nilai berat yang diisi tersimpan sebagai bagian dari transaksi.

## Sub-fitur: Input Nilai Investasi

Memasukkan nominal rupiah yang dikeluarkan untuk pembelian emas.

### Tujuan
Memungkinkan pengguna memasukkan nominal rupiah yang dikeluarkan untuk pembelian emas.

### Selesai bila
- Tersedia kolom angka untuk mengisi nilai investasi dalam rupiah dengan penanda satuan yang jelas.
- Hanya nominal positif yang diterima; huruf atau angka minus ditolak.
- Nominal yang diisi tersimpan sebagai bagian dari transaksi.

## Sub-fitur: Hitung Otomatis

Menghitung otomatis nilai atau berat emas dari angka yang dimasukkan.

### Tujuan
Menghemat waktu pengguna dengan menghitung otomatis nilai atau berat emas dari salah satu angka yang telah diisi.

### Selesai bila
- Saat pengguna mengisi berat emas, kolom nilai investasi terisi otomatis memakai harga acuan yang tersedia.
- Saat pengguna mengisi nilai investasi, kolom berat emas terisi otomatis dengan hasil yang setara.
- Hasil hitungan otomatis tampil rapi (angka dibulatkan wajar) dan tetap bisa disesuaikan pengguna.

## Sub-fitur: Validasi & Simpan

Memeriksa kelengkapan dan format angka sebelum transaksi disimpan.

### Tujuan
Memastikan setiap transaksi yang disimpan sudah lengkap dan benar sebelum masuk ke riwayat portofolio.

### Selesai bila
- Tombol simpan tidak berfungsi atau menampilkan pesan jelas saat tanggal, berat, atau nilai belum lengkap.
- Format angka yang salah (huruf, simbol tidak wajar, nilai nol/negatif) ditolak dengan pesan yang mudah dipahami.
- Bila semua isian valid, transaksi tersimpan dan pengguna otomatis kembali ke beranda.
