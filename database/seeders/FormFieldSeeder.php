<?php

namespace Database\Seeders;

use App\Models\LetterType;
use Illuminate\Database\Seeder;

class FormFieldSeeder extends Seeder
{
   /**
    * Fungsi utama untuk menjalankan seeder formulir.
    */
   public function run(): void
   {
      // 1. SURAT KETERANGAN DOMISILI (10 Fields - Even)
      $this->saveForm('Surat Keterangan Domisili', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input', 'Sesuai KTP'),
         $this->createField('NIK', 'nik', 'number', '16 digit NIK'),
         $this->createField('Pekerjaan', 'pekerjaan', 'input', 'Pekerjaan tetap'),
         $this->createField('Tempat Lahir', 'tempat_lahir', 'input', 'Kota Lahir'),
         $this->createField('Tanggal Lahir', 'tanggal_lahir', 'date'),
         $this->createField('Jenis Kelamin', 'jenis_kelamin', 'select', 'Pilih jenis kelamin', false, ['Laki-laki', 'Perempuan']),
         $this->createField('RT', 'rt', 'number', '001'),
         $this->createField('RW', 'rw', 'number', '001'),
         $this->createField('Alamat Domisili', 'alamat', 'textarea', 'Alamat lengkap tinggal', true),
         $this->createField('Keperluan', 'keperluan', 'textarea', 'Alasan pengajuan', true),
      ]);

      // 2. SURAT KETERANGAN TIDAK MAMPU (6 Fields - Even)
      $this->saveForm('Surat Keterangan Tidak Mampu', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input', 'Sesuai KTP'),
         $this->createField('NIK', 'nik', 'number', '16 digit NIK'),
         $this->createField('Pekerjaan Orang Tua', 'pekerjaan_ortu', 'input', 'Ayah / Ibu'),
         $this->createField('Penghasilan', 'penghasilan', 'number', 'Contoh: 1500000'),
         $this->createField('Alamat Lengkap', 'alamat', 'textarea', 'Alamat tinggal', true),
         $this->createField('Tujuan', 'tujuan', 'textarea', 'Misal: Beasiswa / KIP', true),
      ]);

      // 3. SURAT KETERANGAN USAHA (6 Fields - Even)
      $this->saveForm('Surat Keterangan Usaha', [
         $this->createField('Nama Pemilik', 'nama_lengkap', 'input', 'Nama sesuai KTP'),
         $this->createField('NIK Pemilik', 'nik', 'number', '16 digit NIK'),
         $this->createField('Nama Usaha', 'nama_usaha', 'input', 'Misal: Toko Berkah'),
         $this->createField('Jenis Usaha', 'jenis_usaha', 'input', 'Misal: Kuliner / Dagang'),
         $this->createField('Lama Usaha (Thn)', 'lama_usaha', 'number', 'Contoh: 2'),
         $this->createField('Alamat Usaha', 'alamat_usaha', 'textarea', 'Lokasi usaha', true),
      ]);

      // 4. SURAT KETERANGAN KEMATIAN (8 Fields - Even)
      $this->saveForm('Surat Keterangan Kematian', [
         $this->createField('Nama Almarhum', 'nama_almarhum', 'input', 'Nama yang meninggal'),
         $this->createField('NIK Almarhum', 'nik_almarhum', 'number', 'NIK (opsional)', false),
         $this->createField('Tempat Wafat', 'tempat_kematian', 'input', 'Lokasi wafat'),
         $this->createField('Tanggal Wafat', 'tanggal_kematian', 'date'),
         $this->createField('Penyebab', 'penyebab', 'input', 'Sakit/Usia/Lainnya'),
         $this->createField('Waktu Wafat', 'waktu_wafat', 'input', 'Contoh: 10:00 WIB'),
         $this->createField('Nama Pelapor', 'nama_pelapor', 'input', 'Nama ahli waris'),
         $this->createField('Hubungan Pelapor', 'hubungan_pelapor', 'input', 'Misal: Anak Kandung'),
      ]);

      // 5. SKCK (PENGANTAR) (8 Fields - Even)
      $this->saveForm('Surat Keterangan Catatan Kepolisian', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input', 'Sesuai KTP'),
         $this->createField('NIK', 'nik', 'number', '16 digit NIK'),
         $this->createField('Tempat Lahir', 'tempat_lahir', 'input'),
         $this->createField('Tanggal Lahir', 'tanggal_lahir', 'date'),
         $this->createField('Pekerjaan', 'pekerjaan', 'input'),
         $this->createField('Pendidikan', 'pendidikan', 'select', 'Pilih', false, ['SD', 'SMP', 'SMA', 'Diploma', 'S1', 'S2', 'S3']),
         $this->createField('Alamat Lengkap', 'alamat', 'textarea', 'Domisili saat ini', true),
         $this->createField('Keperluan', 'keperluan', 'textarea', 'Tujuan buat SKCK', true),
      ]);

      // 6. SURAT KETERANGAN PINDAH (6 Fields - Even)
      $this->saveForm('Surat Keterangan Pindah', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input'),
         $this->createField('NIK', 'nik', 'number'),
         $this->createField('Alasan Pindah', 'alasan', 'input', 'Misal: Pekerjaan'),
         $this->createField('Tanggal Pindah', 'tanggal_pindah', 'date'),
         $this->createField('Jml Pengikut', 'jumlah_pengikut', 'number', 'Jml klg yang ikut'),
         $this->createField('Alamat Tujuan', 'alamat_tujuan', 'textarea', 'Lokasi baru', true),
      ]);

      // 7. SURAT KETERANGAN KELAHIRAN (8 Fields - Even)
      $this->saveForm('Surat Keterangan Kelahiran', [
         $this->createField('Nama Bayi', 'nama_bayi', 'input', 'Nama lengkap bayi'),
         $this->createField('Jenis Kelamin', 'jenis_kelamin', 'select', 'Pilih', false, ['Laki-laki', 'Perempuan']),
         $this->createField('Tempat Lahir', 'tempat_lahir', 'input'),
         $this->createField('Tanggal Lahir', 'tanggal_lahir', 'date'),
         $this->createField('Anak Ke-', 'anak_ke', 'number'),
         $this->createField('Pukul Kelahiran', 'waktu_lahir', 'input', 'Contoh: 08:30 WIB'),
         $this->createField('Nama Ayah', 'nama_ayah', 'input'),
         $this->createField('Nama Ibu', 'nama_ibu', 'input'),
      ]);

      // 8. SURAT KETERANGAN BELUM MENIKAH (6 Fields - Even)
      $this->saveForm('Surat Keterangan Belum Menikah', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input'),
         $this->createField('NIK', 'nik', 'number'),
         $this->createField('Pekerjaan', 'pekerjaan', 'input'),
         $this->createField('Status', 'status', 'select', 'Pilih', false, ['Lajang/Belum Kawin', 'Janda', 'Duda']),
         $this->createField('Alamat Lengkap', 'alamat', 'textarea', 'Sesuai Domisili', true),
         $this->createField('Keperluan', 'tujuan', 'textarea', 'Misal: Melamar kerja', true),
      ]);

      // 9. SURAT KETERANGAN PENGHASILAN (6 Fields - Even)
      $this->saveForm('Surat Keterangan Penghasilan', [
         $this->createField('Nama Lengkap', 'nama_lengkap', 'input'),
         $this->createField('Pekerjaan', 'pekerjaan', 'input'),
         $this->createField('Jml Penghasilan', 'gaji', 'number', 'Contoh: 5000000'),
         $this->createField('Tempat Bekerja', 'tempat_kerja', 'input', 'Nama Perusahaan/Instansi'),
         $this->createField('Keperluan', 'tujuan', 'textarea', 'Misal: Pengajuan Kredit', true),
         $this->createField('Alamat Instansi', 'alamat_kerja', 'textarea', 'Lokasi tempat bekerja', true),
      ]);

      // 10. DOMISILI USAHA (6 Fields - Even)
      $this->saveForm('Surat Keterangan Domisili Usaha', [
         $this->createField('Nama Usaha', 'nama_usaha', 'input', 'Misal: PT Maju Jaya'),
         $this->createField('Jenis Usaha', 'jenis_usaha', 'input'),
         $this->createField('Nama Pimpinan', 'pimpinan', 'input'),
         $this->createField('Lama Beroperasi', 'lama_usaha', 'number', 'Contoh: 2 Tahun'),
         $this->createField('Alamat Usaha', 'alamat_usaha', 'textarea', 'Lokasi gedung', true),
         $this->createField('Keperluan', 'keperluan', 'textarea', 'Tujuan pengajuan', true),
      ]);

      // 11. AHLI WARIS (6 Fields - Even)
      $this->saveForm('Surat Keterangan Ahli Waris', [
         $this->createField('Nama Pewaris', 'nama_pewaris', 'input', 'Nama yg meninggal'),
         $this->createField('NIK Pewaris', 'nik_pewaris', 'number', 'Opsional', false),
         $this->createField('Tempat Wafat', 'tempat_wafat', 'input'),
         $this->createField('Tanggal Wafat', 'tanggal_wafat', 'date'),
         $this->createField('Daftar Ahli Waris', 'ahli_waris', 'textarea', 'Nama semua ahli waris', true),
         $this->createField('Hubungan', 'hubungan', 'textarea', 'Misal: Istri & 2 Anak', true),
      ]);

      // 12. IZIN KERAMAIAN (6 Fields - Even)
      $this->saveForm('Surat Keterangan Izin Keramaian', [
         $this->createField('Nama Penyelenggara', 'nama_lengkap', 'input'),
         $this->createField('NIK Penyelenggara', 'nik', 'number'),
         $this->createField('Nama Acara', 'nama_acara', 'input', 'Misal: Resepsi'),
         $this->createField('Waktu Acara', 'waktu', 'input', '08:00 - Selesai'),
         $this->createField('Tanggal Acara', 'tanggal', 'date'),
         $this->createField('Lokasi Acara', 'lokasi', 'textarea', 'Tempat acara', true),
      ]);
   }

   /**
    * Helper: Menyimpan daftar field ke dalam database.
    */
   private function saveForm(string $namaSurat, array $fields): void
   {
      $surat = LetterType::where('name', $namaSurat)->first();
      if (!$surat) return;

      foreach ($fields as $urutan => $field) {
         $field['order_position'] = $urutan;
         $surat->fields()->updateOrCreate(['name' => $field['name']], $field);
      }
   }

   /**
    * Helper: Membuat skema field dengan ringkas.
    */
   private function createField($label, $name, $type, $placeholder = '', $isFull = false, $options = null, $isRequired = true)
   {
      $dataType = 'string';
      if ($type === 'number') $dataType = 'number';
      if ($type === 'date')   $dataType = 'date';

      return [
         'label'         => $label,
         'name'          => $name,
         'type'          => $type,
         'placeholder'   => $placeholder ?: "Masukkan $label",
         'is_required'   => $isRequired,
         'is_full_width' => $isFull,
         'data_type'     => $dataType,
         'options'       => $options,
      ];
   }
}
