# Cadangkan & Pulihkan

Memungkinkan pengguna menyimpan dan memulihkan seluruh data investasi ke berkas cadangan.

## Spesifikasi

### Tujuan
Memberi pengguna cara aman untuk menyimpan seluruh catatan investasi emas ke satu berkas cadangan dan memulihkannya kembali kapan saja, sehingga data tidak hilang saat ganti perangkat atau memasang ulang aplikasi.
### Selesai bila
- Pengguna dapat membuat satu berkas cadangan berisi seluruh riwayat transaksi dari satu halaman khusus cadangan & pemulihan.
- Pengguna dapat memulihkan data dari berkas cadangan yang dipilih, dan riwayat serta ringkasan portofolio langsung menampilkan data hasil pemulihan.
- Berkas cadangan yang rusak atau tidak sesuai ditolak dengan pesan yang jelas tanpa merusak data yang sudah ada.
- Setelah cadangan dibuat, pengguna dapat membagikan berkas tersebut ke aplikasi atau penyimpanan lain.
- Bila cadangan dibuat saat belum ada transaksi, pengguna diberi tahu bahwa tidak ada data yang bisa dicadangkan.

## Sub-fitur: Ekspor ke JSON

Menyimpan seluruh data transaksi ke dalam satu berkas cadangan berformat JSON.

### Tujuan
Menyimpan seluruh data transaksi investasi pengguna ke satu berkas cadangan berformat JSON agar bisa disimpan atau dipindahkan dengan aman.
### Selesai bila
- Menjalankan aksi ekspor menghasilkan satu berkas cadangan berformat JSON yang berisi seluruh entri transaksi.
- Setelah ekspor berhasil, pengguna melihat penanda atau pesan bahwa cadangan berhasil dibuat.
- Bila belum ada transaksi, pengguna diberi tahu bahwa tidak ada data yang bisa dicadangkan.

## Sub-fitur: Impor Data

Memulihkan data investasi dari berkas cadangan yang dipilih pengguna.

### Tujuan
Memulihkan data investasi pengguna dari berkas cadangan yang dipilihnya, sehingga riwayat transaksi kembali seperti semula.
### Selesai bila
- Pengguna dapat memilih satu berkas cadangan dari perangkat untuk dipulihkan.
- Setelah pemulihan berhasil, riwayat transaksi dan ringkasan di beranda menampilkan data hasil pemulihan.
- Jika berkas tidak valid, proses dibatalkan dan data lama tetap utuh.

## Sub-fitur: Bagikan Berkas

Membagikan berkas cadangan ke aplikasi atau penyimpanan lain di perangkat.

### Tujuan
Memungkinkan pengguna mengirim berkas cadangan ke aplikasi atau penyimpanan lain di perangkat agar tersimpan di luar aplikasi.
### Selesai bila
- Tersedia aksi bagikan saat berkas cadangan sudah siap.
- Menu berbagi bawaan perangkat muncul dan pengguna dapat memilih tujuan seperti pesan, email, atau penyimpanan.
- Bila pengguna membatalkan proses berbagi, aplikasi tidak menampilkan pesan gagal.

## Sub-fitur: Pemeriksaan Berkas

Membatalkan proses pemulihan bila berkas cadangan rusak atau tidak sesuai.

### Tujuan
Memastikan hanya berkas cadangan yang benar dan lengkap yang boleh dipulihkan, agar data investasi pengguna tidak rusak.
### Selesai bila
- Berkas yang rusak, kosong, atau tidak sesuai format ditolak sebelum data apa pun diubah.
- Pengguna melihat pesan yang menjelaskan berkas tidak bisa dipakai untuk pemulihan.
- Data investasi yang sudah ada tetap aman dan tidak berubah setelah berkas ditolak.
