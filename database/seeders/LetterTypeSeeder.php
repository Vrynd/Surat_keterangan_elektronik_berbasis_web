<?php

namespace Database\Seeders;

use App\Models\LetterType;
use Illuminate\Database\Seeder;

class LetterTypeSeeder extends Seeder
{
   /**
    * Run the database seeds.
    */
   public function run(): void
   {
      $letterTypes = [
         [
            'code' => '470/SKD/2026',
            'name' => 'Surat Keterangan Domisili',
            'category' => 'kependudukan',
            'description' => 'Surat keterangan untuk menyatakan tempat tinggal seseorang di suatu wilayah tertentu. Surat ini diperlukan untuk keperluan administrasi seperti pembuatan KTP, pendaftaran sekolah, atau keperluan lainnya.',
            'processing_time' => '1 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '460/SKTM/2026',
            'name' => 'Surat Keterangan Tidak Mampu',
            'category' => 'sosial',
            'description' => 'Surat keterangan yang menyatakan bahwa seseorang berasal dari keluarga kurang mampu. Digunakan untuk mengajukan bantuan sosial, keringanan biaya pendidikan, atau program bantuan lainnya.',
            'processing_time' => '2 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '500/SKU/2026',
            'name' => 'Surat Keterangan Usaha',
            'category' => 'ekonomi',
            'description' => 'Surat keterangan yang menyatakan bahwa seseorang memiliki usaha di wilayah tertentu. Diperlukan untuk keperluan perbankan, perizinan usaha, atau pengajuan kredit.',
            'processing_time' => '2 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '470/SKK/2026',
            'name' => 'Surat Keterangan Kematian',
            'category' => 'kependudukan',
            'description' => 'Surat keterangan resmi yang menyatakan seseorang telah meninggal dunia. Diperlukan untuk pengurusan akta kematian, klaim asuransi, dan pengurusan warisan.',
            'processing_time' => '1 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '460/SKCK/2026',
            'name' => 'Surat Keterangan Catatan Kepolisian',
            'category' => 'sosial',
            'description' => 'Surat pengantar untuk pembuatan SKCK di kepolisian. Digunakan sebagai persyaratan melamar pekerjaan, pendaftaran CPNS, atau keperluan lainnya yang membutuhkan catatan kelakuan baik.',
            'processing_time' => '1 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '470/SKP/2026',
            'name' => 'Surat Keterangan Pindah',
            'category' => 'kependudukan',
            'description' => 'Surat keterangan untuk menyatakan perpindahan domisili seseorang dari satu wilayah ke wilayah lain. Diperlukan untuk pengurusan administrasi kependudukan di tempat tujuan.',
            'processing_time' => '3 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '470/SKLH/2026',
            'name' => 'Surat Keterangan Kelahiran',
            'category' => 'kependudukan',
            'description' => 'Surat keterangan yang menyatakan kelahiran seorang anak. Diperlukan sebagai dasar untuk pengurusan akta kelahiran di Dinas Kependudukan dan Catatan Sipil.',
            'processing_time' => '1 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '470/SKBM/2026',
            'name' => 'Surat Keterangan Belum Menikah',
            'category' => 'kependudukan',
            'description' => 'Surat keterangan yang menyatakan bahwa seseorang belum pernah menikah. Diperlukan untuk persyaratan administrasi pernikahan, melamar pekerjaan, atau keperluan lainnya.',
            'processing_time' => '1 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '500/SKPH/2026',
            'name' => 'Surat Keterangan Penghasilan',
            'category' => 'ekonomi',
            'description' => 'Surat keterangan yang menyatakan jumlah penghasilan seseorang. Diperlukan untuk pengajuan kredit, beasiswa, atau keperluan administrasi lainnya yang membutuhkan informasi pendapatan.',
            'processing_time' => '2 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '500/SKDU/2026',
            'name' => 'Surat Keterangan Domisili Usaha',
            'category' => 'ekonomi',
            'description' => 'Surat keterangan yang menyatakan lokasi domisili suatu usaha atau kegiatan bisnis. Digunakan untuk pengurusan izin usaha, NPWP badan, atau keperluan perizinan lainnya.',
            'processing_time' => '2 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '460/SKAW/2026',
            'name' => 'Surat Keterangan Ahli Waris',
            'category' => 'sosial',
            'description' => 'Surat keterangan yang menyatakan seseorang sebagai ahli waris yang sah. Diperlukan untuk pengurusan harta warisan, klaim asuransi, atau pengalihan hak kepemilikan aset.',
            'processing_time' => '3 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
         [
            'code' => '460/SKIK/2026',
            'name' => 'Surat Keterangan Izin Keramaian',
            'category' => 'sosial',
            'description' => 'Surat keterangan izin untuk mengadakan acara atau kegiatan yang melibatkan banyak orang. Diperlukan sebagai persyaratan penyelenggaraan hajatan, pesta, atau kegiatan sosial lainnya.',
            'processing_time' => '3 Hari Kerja',
            'validity_period' => '12 Bulan',
            'is_active' => true,
         ],
      ];

      foreach ($letterTypes as $letterType) {
         LetterType::updateOrCreate(
            ['code' => $letterType['code']],
            $letterType
         );
      }
   }
}
