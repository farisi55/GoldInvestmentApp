# Grafik Pertumbuhan

Memvisualisasikan tren pertumbuhan nilai investasi emas dalam bentuk grafik interaktif.

## Spesifikasi

### Tujuan
Menampilkan pertumbuhan nilai investasi emas pengguna dari waktu ke waktu dalam bentuk grafik interaktif, agar pengguna awam bisa melihat perkembangan investasinya secara sekilas.

### Selesai bila
- Halaman grafik dapat dibuka dari navigasi aplikasi dan menampilkan grafik tren nilai investasi berdasarkan data transaksi yang tersimpan.
- Grafik menampilkan sumbu waktu (tanggal) dan sumbu nilai investasi dengan label yang mudah dibaca (mis. nominal rupiah).
- Pengguna dapat memilih rentang waktu tertentu dan grafik ikut menyesuaikan tampilannya.
- Saat pengguna menyentuh titik pada grafik, muncul rincian nilai pada titik tersebut.
- Bila belum ada data investasi, halaman menampilkan pesan keadaan kosong alih-alih grafik kosong tanpa keterangan.

## Sub-fitur: Grafik Tren Investasi

Menampilkan grafik pertumbuhan nilai investasi dari waktu ke waktu.

### Tujuan
Menampilkan pertumbuhan nilai investasi emas pengguna sebagai grafik dari waktu ke waktu agar tren investasinya terlihat jelas.

### Selesai bila
- Grafik tampil berisi titik data yang berasal dari transaksi pengguna, diurutkan menurut tanggal.
- Sumbu waktu (tanggal) dan sumbu nilai investasi tampil dengan label yang bisa dipahami pengguna awam.
- Grafik diperbarui otomatis mengikuti data transaksi terkini saat halaman dibuka.

## Sub-fitur: Filter Rentang Waktu

Memilih periode waktu tertentu yang ingin ditampilkan pada grafik.

### Tujuan
Memberi pengguna pilihan periode waktu yang ditampilkan pada grafik agar dapat fokus pada rentang investasi yang diinginkan.

### Selesai bila
- Tersedia pilihan rentang waktu (mis. beberapa bulan/tahun terakhir) yang dapat dipilih pengguna.
- Saat rentang waktu dipilih, grafik langsung menampilkan data sesuai periode tersebut.
- Rentang waktu yang sedang aktif terlihat jelas sebagai pilihan yang sedang dipakai.

## Sub-fitur: Tooltip Interaktif

Menampilkan rincian nilai saat pengguna menyentuh titik pada grafik.

### Tujuan
Menampilkan rincian nilai investasi saat pengguna menyentuh titik pada grafik, agar angka tepatnya dapat diketahui.

### Selesai bila
- Saat pengguna menyentuh sebuah titik pada grafik, muncul keterangan berisi nilai dan tanggal titik tersebut.
- Keterangan hilang atau berpindah saat pengguna menyentuh titik lain.
- Angka pada keterangan ditampilkan dalam format yang mudah dibaca (mis. rupiah).

## Sub-fitur: Tampilan Kosong

Menampilkan keadaan tanpa grafik ketika belum ada data investasi.

### Tujuan
Menampilkan keadaan khusus saat belum ada data investasi, agar pengguna mengerti mengapa grafik tidak muncul.

### Selesai bila
- Bila belum ada transaksi, halaman menampilkan pesan keadaan kosong, bukan grafik kosong tanpa keterangan.
- Pesan keadaan kosong menjelaskan bahwa pengguna perlu mencatat investasi lebih dahulu.
- Setelah pengguna menambah transaksi, grafik kembali tampil normal saat halaman dibuka.
