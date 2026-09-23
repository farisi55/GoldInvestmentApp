# Harga Emas Pasar

Menampilkan daftar harga emas terkini dari pasar dunia dalam berbagai mata uang.

## Spesifikasi

### Tujuan
Memungkinkan pengguna memantau harga emas pasar dunia terkini dalam berbagai mata uang sebagai acuan nilai portofolionya.
### Selesai bila
- Halaman harga emas menampilkan daftar harga emas terkini, minimal dalam rupiah (IDR) dan beberapa mata uang asing pilihan.
- Setiap baris harga menampilkan nama/kode mata uang dan nominal harga emas dengan format angka yang mudah dibaca.
- Harga yang tampil berasal dari sumber pasar global dan diperbarui saat halaman dibuka atau ditarik ulang oleh pengguna.
- Bila data harga gagal dimuat, halaman tetap menampilkan pesan status gagal atau nilai cadangan, bukan layar error mentah.
- Halaman tetap dapat dibuka tanpa koneksi internet dan menampilkan status yang jelas terkait data yang tidak tersedia.

## Sub-fitur: Kurs Multi Mata Uang

Menampilkan harga emas dalam rupiah dan sejumlah mata uang asing.

### Tujuan
Menampilkan harga emas terkini dalam rupiah dan sejumlah mata uang asing agar pengguna bisa membandingkan nilai emasnya lintas mata uang.
### Selesai bila
- Daftar harga menampilkan minimal harga emas dalam rupiah (IDR) beserta beberapa mata uang asing pilihan.
- Setiap baris menampilkan kode/nama mata uang dan nominal harga dengan format angka yang mudah dibaca.
- Daftar harga dapat digulir dan tetap rapi saat jumlah mata uang yang ditampilkan banyak.

## Sub-fitur: Harga Real-Time

Mengambil dan memperbarui harga emas terkini dari sumber pasar global.

### Tujuan
Mengambil harga emas terkini dari sumber pasar global dan memperbaruinya agar pengguna selalu melihat angka yang aktual.
### Selesai bila
- Harga emas dimuat otomatis saat halaman harga dibuka.
- Pengguna dapat memperbarui harga secara manual dan halaman menampilkan perubahan angkanya.
- Saat proses memuat berlangsung, halaman menunjukkan indikator bahwa data sedang diambil.

## Sub-fitur: Status Gagal Muat

Menampilkan pesan atau nilai cadangan ketika data harga gagal dimuat.

### Tujuan
Memberi tahu pengguna dengan jelas ketika harga emas gagal dimuat, alih-alih menampilkan error mentah atau layar kosong.
### Selesai bila
- Saat gagal memuat, halaman menampilkan pesan status gagal yang mudah dipahami pengguna.
- Halaman tetap menampilkan nilai cadangan terakhir yang tersedia bila ada, dan menandainya dengan jelas.
- Tersedia cara bagi pengguna untuk mencoba memuat ulang harga setelah kegagalan.
