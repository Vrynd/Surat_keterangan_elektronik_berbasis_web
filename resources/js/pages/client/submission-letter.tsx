import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import LetterInfo from '@/components/letter-info';
import { ConfirmModal } from '@/components/confirm-modal';
import { ActionBar } from '@/components/action-bar';
import FormPlaceholder from '@/components/form-placeholder';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle2, Loader2, Send, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DynamicForm from '@/components/forms/dynamic-form';
import { useForm } from '@inertiajs/react';

interface Props {
   letterType: any;
   fields: any[];
}

export default function SubmissionLetter() {
   const { letterType, fields, url } = usePage<any>().props;

   const [formKey, setFormKey] = useState(0);
   const [showResetAlert, setShowResetAlert] = useState(false);
   const [showResetConfirm, setShowResetConfirm] = useState(false);

   const initialData = (fields || []).reduce((acc: any, field: any) => {
      acc[field.name] = '';
      return acc;
   }, {} as Record<string, any>);

   const form = useForm(initialData);
   const { data, post, processing, reset } = form;

   const isFormAvailable = fields && fields.length > 0;
   const letterName = letterType?.name || 'Surat KETERANGAN';

   const breadcrumbs: BreadcrumbItem[] = [
      {
         title: 'Dashboard',
         href: '/client/dashboard',
      },
      {
         title: letterName,
         href: url,
      },
   ];

   const handleSubmit = (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      console.log('Submit:', data);
      // TODO: kirim data ke backend via Inertia
   };

   const isDirty = Object.values(data).some((value: any) =>
      typeof value === 'string' ? value.trim() !== '' : !!value
   );

   const handleReset = () => {
      reset();
      setFormKey((prev) => prev + 1);
      setShowResetAlert(true);
      setShowResetConfirm(false);
   };

   useEffect(() => {
      if (showResetAlert) {
         const timer = setTimeout(() => setShowResetAlert(false), 3000);
         return () => clearTimeout(timer);
      }
   }, [showResetAlert]);

   return (
      <FeatureLayout
         title={letterName}
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               {letterName}
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
                  title={isFormAvailable ? 'Formulir Pengajuan' : letterName}
                  description={
                     isFormAvailable
                        ? 'Isi formulir di bawah ini dengan informasi yang benar dan valid.'
                        : 'Formulir untuk jenis surat ini belum tersedia.'
                  }
               />
            </div>

            {isFormAvailable ? (
               <div className="flex flex-col gap-8">
                  <LetterInfo
                     description={letterType.description}
                     processingTime={letterType.processing_time}
                     validityPeriod={letterType.validity_period}
                     isActive={!!letterType.is_active}
                     className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0"
                  />

                  <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-5">
                     <DynamicForm
                        key={formKey}
                        fields={fields}
                        onSubmit={handleSubmit}
                        showSubmitButton={false}
                        externalForm={form}
                     />
                  </div>

                  <ActionBar
                     message={
                        <div className="flex items-center gap-2">
                           <Info className="size-4 text-emerald-500" />
                           <span className="font-medium">Pastikan semua data sudah terisi dengan benar.</span>
                        </div>
                     }
                  >
                     <Button
                        variant={!isDirty || processing ? "outline" : "secondary"}
                        size="sm"
                        onClick={() => setShowResetConfirm(true)}
                        disabled={!isDirty || processing}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed h-10 px-4">
                        <RotateCcw className="size-4" />
                        Reset Formulir
                     </Button>
                     <Button
                        variant="emerald"
                        size="sm"
                        onClick={() => handleSubmit()}
                        disabled={processing}
                        className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed h-10 px-6 font-bold">
                        {processing ? (
                           <Loader2 className="size-4 animate-spin" />
                        ) : (
                           <Send className="size-4 text-white/80" />
                        )}
                        Ajukan Sekarang
                     </Button>
                  </ActionBar>
               </div>
            ) : (
               <FormPlaceholder letterType={letterName} />
            )}

            <ConfirmModal
               isOpen={showResetConfirm}
               onClose={() => setShowResetConfirm(false)}
               onConfirm={handleReset}
               variant="destructive"
               title="Reset Formulir?"
               description="Semua data yang telah Anda isi akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan."
               confirmText="Ya, Reset"
            />
         </div>
      </FeatureLayout>
   );
}
