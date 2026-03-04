import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { unslugify } from '@/lib/utils';
import { FormDomisili, type DomisiliFormData } from '@/components/forms/form-domisili';
import LetterInfo from '@/components/letter-info';
import FormPlaceholder from '@/components/form-placeholder';

// Data info per jenis surat
const letterInfoMap: Record<string, { description: string; processingTime: string }> = {
   'Surat Keterangan Domisili': {
      description:
         'Surat keterangan untuk menyatakan tempat tinggal seseorang di suatu wilayah tertentu. Surat ini berlaku selama 6 bulan sejak tanggal diterbitkan.',
      processingTime: '1 Hari Kerja',
   },
};

// Daftar jenis surat yang sudah punya form
const availableForms = ['Surat Keterangan Domisili'];

export default function SubmissionLetter() {
   const { url } = usePage();
   const params = new URLSearchParams(url.split('?')[1] || '');
   const letterType = unslugify(params.get('type') || 'Pengajuan Surat');

   const isFormAvailable = availableForms.includes(letterType);
   const letterInfo = letterInfoMap[letterType];

   const breadcrumbs: BreadcrumbItem[] = [
      {
         title: 'Dashboard',
         href: '/dashboard',
      },
      {
         title: letterType,
         href: url,
      },
   ];

   const handleSubmit = (data: DomisiliFormData) => {
      console.log('Submit:', data);
      // TODO: kirim data ke backend via Inertia
   };

   return (
      <FeatureLayout
         title={letterType}
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               {letterType}
            </h1>
         }>
         <div className="space-y-8">
            <Heading
               title={isFormAvailable ? 'Formulir Pengajuan' : letterType}
               description={
                  isFormAvailable
                     ? 'Isi formulir di bawah ini dengan informasi yang benar dan valid.'
                     : 'Formulir untuk jenis surat ini belum tersedia.'
               }
            />

            {isFormAvailable ? (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8">
                     <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-5">
                        <FormDomisili onSubmit={handleSubmit} />
                     </div>
                  </div>
                  <div className="lg:col-span-4">
                     <div className="sticky top-6">
                        {letterInfo && <LetterInfo {...letterInfo} />}
                     </div>
                  </div>
               </div>
            ) : (
               <FormPlaceholder letterType={letterType} />
            )}
         </div>
      </FeatureLayout>
   );
}
