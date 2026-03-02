import { usePage } from '@inertiajs/react';
import { Search, FileQuestion } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SubHeader } from '@/components/app-sub-header';
import type { BreadcrumbItem } from '@/types';
import FeatureLayout from '@/layouts/feature-layout';
import { ServiceCard } from '@/components/service-card';
import { useState, useMemo } from 'react';

const breadcrumbs: [BreadcrumbItem, ...BreadcrumbItem[]] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
];

interface Service {
   id: string;
   name: string;
   category: 'kependudukan' | 'ekonomi' | 'sosial';
   description: string;
   processingTime: string;
   previewBody: string[];
}

const services: Service[] = [
   {
      id: '1',
      name: 'Surat Keterangan Domisili',
      category: 'kependudukan',
      description: 'Surat keterangan untuk menyatakan tempat tinggal seseorang di suatu wilayah tertentu.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Tempat Tinggal', 'Alamat Lengkap', 'Masa Berlaku'],
   },
   {
      id: '2',
      name: 'Surat Keterangan Usaha',
      category: 'ekonomi',
      description: 'Surat bukti kepemilikan atau operasional sebuah usaha di wilayah tertentu.',
      processingTime: '2 Hari Kerja',
      previewBody: ['Nama Usaha', 'Jenis Usaha', 'Lokasi Usaha'],
   },
   {
      id: '3',
      name: 'Surat Keterangan Tidak Mampu',
      category: 'sosial',
      description: 'Surat untuk mendapatkan keringanan biaya pendidikan, kesehatan, atau bantuan sosial.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Penghasilan', 'Status Sosial', 'Tanggungan'],
   },
   {
      id: '4',
      name: 'Surat Keterangan Catatan Kepolisian',
      category: 'kependudukan',
      description: 'Dokumen yang menerangkan ada atau tidak adanya catatan kriminal seseorang.',
      processingTime: '3 Hari Kerja',
      previewBody: ['Catatan Kriminal', 'Sidik Jari', 'Tindakan Hukum'],
   },
   {
      id: '5',
      name: 'Surat Keterangan Kematian',
      category: 'kependudukan',
      description: 'Surat pernyataan resmi dari pihak berwenang mengenai kematian seseorang.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Penyebab', 'Waktu/Tempat', 'Akta Terkait'],
   },
   {
      id: '6',
      name: 'Surat Keterangan Pindah',
      category: 'kependudukan',
      description: 'Surat pengantar untuk pengurusan berkas administrasi kepindahan penduduk.',
      processingTime: '2 Hari Kerja',
      previewBody: ['Alamat Asal', 'Alamat Tujuan', 'Anggota Pindah'],
   },
   {
      id: '7',
      name: 'Surat Keterangan Kelahiran',
      category: 'kependudukan',
      description: 'Surat pernyataan resmi mengenai peristiwa kelahiran seorang anak.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Nama Anak', 'Orang Tua', 'Waktu Lahir'],
   },
   {
      id: '8',
      name: 'Surat Keterangan Belum Menikah',
      category: 'kependudukan',
      description: 'Surat yang menerangkan bahwa seseorang belum pernah melangsungkan pernikahan.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Status Sipil', 'Keperluan', 'Validasi Lurah'],
   },
   {
      id: '9',
      name: 'Surat Keterangan Penghasilan',
      category: 'ekonomi',
      description: 'Surat yang merincikan besaran pendapatan seseorang untuk keperluan administrasi.',
      processingTime: '1 Hari Kerja',
      previewBody: ['Besar Gaji', 'Instansi', 'Jabatan'],
   },
   {
      id: '10',
      name: 'Surat Keterangan Domisili Usaha',
      category: 'ekonomi',
      description: 'Surat keterangan domisili khusus untuk lokasi operasional sebuah badan usaha.',
      processingTime: '2 Hari Kerja',
      previewBody: ['Nama Perusahaan', 'Alamat Kantor', 'Legalitas'],
   },
   {
      id: '11',
      name: 'Surat Keterangan Ahli Waris',
      category: 'ekonomi',
      description: 'Surat yang menetapkan ahli waris yang sah dari seseorang yang telah meninggal dunia.',
      processingTime: '3 Hari Kerja',
      previewBody: ['Nama Pewaris', 'Daftar Waris', 'Pembagian'],
   },
   {
      id: '12',
      name: 'Surat Keterangan Izin Keramaian',
      category: 'sosial',
      description: 'Surat permohonan izin untuk menyelenggarakan acara yang melibatkan banyak orang.',
      processingTime: '2 Hari Kerja',
      previewBody: ['Nama Acara', 'Lokasi', 'Estimasi Massa'],
   },
];

export default function Dashboard() {
   const { auth } = usePage().props;
   const [selectedCategory, setSelectedCategory] = useState<string>('all');
   const [searchQuery, setSearchQuery] = useState<string>('');

   const counts = {
      all: services.length,
      kependudukan: services.filter((s) => s.category === 'kependudukan').length,
      ekonomi: services.filter((s) => s.category === 'ekonomi').length,
      sosial: services.filter((s) => s.category === 'sosial').length,
   };

   const filteredServices = useMemo(() => {
      return services.filter((service) => {
         const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
         const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
         return matchesCategory && matchesSearch;
      });
   }, [selectedCategory, searchQuery]);

   return (
      <FeatureLayout
         title="Dashboard"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Hi, {auth.user.name.split(' ').slice(0, 2).join(' ')}! 👋
            </h1>
         }
      >
         <div className="space-y-8">
            {/* Sub Header Section */}
            <SubHeader
               title="Layanan Surat Keterangan"
               description="Pilih dan ajukan surat keterangan Anda dengan mudah dan cepat."
            >
               <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                     placeholder="Cari jenis surat (contoh: Domisili, SKU...)"
                     className="pl-10 h-11 bg-white dark:bg-neutral-900 w-full"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
               <div className="flex-none">
                  <ToggleGroup
                     type="single"
                     value={selectedCategory}
                     onValueChange={(value) => value && setSelectedCategory(value)}
                     className="bg-neutral-100 dark:bg-neutral-900 p-1 border border-input rounded-lg h-11">
                     <ToggleGroupItem value="all" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Semua
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.all}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="kependudukan" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Kependudukan
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.kependudukan}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="ekonomi" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Ekonomi
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.ekonomi}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="sosial" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Sosial
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.sosial}
                        </span>
                     </ToggleGroupItem>
                  </ToggleGroup>
               </div>
            </SubHeader>

            {/* Grid Content */}
            <div className="flex flex-col gap-4">
               {filteredServices.length > 0 ? (
                  <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                     {filteredServices.map((service) => (
                        <ServiceCard
                           key={service.id}
                           id={service.id}
                           name={service.name}
                           description={service.description}
                           processingTime={service.processingTime}
                           category={service.category}
                           previewBody={service.previewBody}
                        />
                     ))}
                  </div>
               ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                     <div className="size-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
                        <FileQuestion className="size-8 text-neutral-400" />
                     </div>
                     <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Tidak ada layanan ditemukan</h3>
                     <p className="text-sm text-neutral-500 max-w-xs text-center mt-1">
                        Coba sesuaikan kata kunci pencarian atau pilih kategori lain.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </FeatureLayout>
   );
}
