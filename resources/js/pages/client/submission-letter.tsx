import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { unslugify } from '@/lib/utils';
import { FormDomisili, type DomisiliFormData } from '@/components/forms/form-domisili';
import LetterInfo from '@/components/letter-info';
import FormPlaceholder from '@/components/form-placeholder';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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

   const [formKey, setFormKey] = useState(0);
   const [isDirty, setIsDirty] = useState(false);
   const [showResetAlert, setShowResetAlert] = useState(false);

   const isFormAvailable = availableForms.includes(letterType);
   const letterInfo = letterInfoMap[letterType];

   const breadcrumbs: BreadcrumbItem[] = [
      {
         title: 'Dashboard',
         href: '/client/dashboard',
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

   const handleFormChange = (data: DomisiliFormData) => {
      const hasContent = Object.values(data).some(value => value.trim() !== '');
      setIsDirty(hasContent);
   };

   const resetForm = () => {
      setFormKey((prev) => prev + 1);
      setIsDirty(false);
      setShowResetAlert(true);
   };

   useEffect(() => {
      if (showResetAlert) {
         const timer = setTimeout(() => setShowResetAlert(false), 3000);
         return () => clearTimeout(timer);
      }
   }, [showResetAlert]);

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
            <div className="space-y-4">
               {showResetAlert && (
                  <Alert className="bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800 animate-in fade-in slide-in-from-top-2 duration-300">
                     <CheckCircle2 className="size-4 text-emerald-600" />
                     <AlertTitle className="text-emerald-800 dark:text-emerald-400">Berhasil!</AlertTitle>
                     <AlertDescription className="text-emerald-700 dark:text-emerald-500">
                        Formulir telah berhasil dipulihkan ke kondisi awal.
                     </AlertDescription>
                  </Alert>
               )}

               <Heading
                  title={isFormAvailable ? 'Formulir Pengajuan' : letterType}
                  description={
                     isFormAvailable
                        ? 'Isi formulir di bawah ini dengan informasi yang benar dan valid.'
                        : 'Formulir untuk jenis surat ini belum tersedia.'
                  }
                  action={
                     isFormAvailable && (
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={resetForm}
                           disabled={!isDirty}
                           className="text-neutral-500 cursor-pointer hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                           <RotateCcw className="size-4" />
                           Reset Formulir
                        </Button>
                     )
                  }
               />
            </div>

            {isFormAvailable ? (
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8">
                     <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-5">
                        <FormDomisili
                           key={formKey}
                           onSubmit={handleSubmit}
                           onChange={handleFormChange}
                        />
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
