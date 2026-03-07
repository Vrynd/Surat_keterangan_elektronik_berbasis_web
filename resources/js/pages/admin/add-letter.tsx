import React from 'react';
import { useForm } from '@inertiajs/react';
import { RotateCcw, Save } from 'lucide-react';
import { isFormValid } from '@/lib/validation';
import FeatureLayout from '@/layouts/feature-layout';
import { Button } from '@/components/ui/button';
import { letterTypeSchema } from '@/components/forms/validation.schema';
import type { BreadcrumbItem } from '@/types';
import { ConfirmModal } from '@/components/confirm-modal';
import Heading from '@/components/heading';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { LetterTypeForm } from '@/components/forms/letter-type-form';
import { ActionBar } from '@/components/action-bar';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/admin/dashboard',
   },
   {
      title: 'Buat Surat',
      href: '/admin/add-letter',
   },
];

export default function AddLetter({ lastAddedDate }: { lastAddedDate: string | null }) {
   const { data, setData, post, processing, errors, reset } = useForm({
      code: '',
      name: '',
      category: '' as any,
      description: '',
      processing_time: '',
      validity_period: '',
      is_active: true,
   });

   const [showResetModal, setShowResetModal] = useState(false);
   const [showSaveModal, setShowSaveModal] = useState(false);

   const generateCode = (name: string, category: string) => {
      const classificationMap: Record<string, string> = {
         'kependudukan': '470',
         'ekonomi': '500',
         'sosial': '460'
      };

      const classification = classificationMap[category] || '000';
      const initials = name
         .split(' ')
         .filter(word => word.length > 0)
         .map(word => word[0].toUpperCase())
         .join('')
         .substring(0, 5);

      const year = new Date().getFullYear();

      if (!initials) return classification;
      return `${classification}/${initials}/${year}`;
   };

   const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newName = e.target.value;
      const newCode = generateCode(newName, data.category);

      const currentGenerated = generateCode(data.name, data.category);

      const normalize = (s: string) => s.replace(/\s+/g, '');
      if (!data.code || normalize(data.code) === normalize(currentGenerated)) {
         setData(prev => ({
            ...prev,
            name: newName,
            code: newCode
         }));
      } else {
         setData('name', newName);
      }
   };

   const changeCategory = (val: any) => {
      const newCode = generateCode(data.name, val);

      const currentGenerated = generateCode(data.name, data.category);

      const normalize = (s: string) => s.replace(/\s+/g, '');
      if (!data.code || normalize(data.code) === normalize(currentGenerated)) {
         setData(prev => ({
            ...prev,
            category: val,
            code: newCode
         }));
      } else {
         setData('category', val);
      }
   };

   const submit = (e?: React.FormEvent) => {
      e?.preventDefault();
      post('/admin/letter-types', {
         onSuccess: () => setShowSaveModal(false),
      });
   };

   const isFormComplete = isFormValid(data, letterTypeSchema);

   const totalFields = 7;
   const filledFields = [data.name, data.code, data.category, data.description, data.processing_time, data.validity_period, data.is_active]
      .filter(v => v !== null && v !== undefined && String(v).trim() !== '').length;

   return (
      <FeatureLayout
         title="Tambah Surat"
         breadcrumbs={breadcrumbs}
         header={
            <div className="flex flex-col gap-1">
               <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Buat Surat Keterangan</h1>
               {lastAddedDate && (
                  <p className="text-sm text-neutral-500">
                     Terakhir ditambahkan {new Date(lastAddedDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                     })}
                  </p>
               )}
            </div>
         }>
         <form id="add-letter-form" onSubmit={submit} className="space-y-8">
            <Heading
               title="Informasi Dasar"
               description="Lengkapi detail di bawah ini untuk menambahkan jenis surat keterangan baru"
            >
               <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Kelengkapan Formulir</span>
                     <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full",
                        filledFields === totalFields
                           ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                           : "bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                     )}>
                        {filledFields}/{totalFields}
                     </span>
                  </div>
                  <div className="flex gap-1">
                     {Array.from({ length: totalFields }).map((_, i) => (
                        <div
                           key={i}
                           className={cn(
                              "h-1 flex-1 rounded-full transition-all duration-500",
                              i < filledFields
                                 ? "bg-emerald-500 dark:bg-emerald-400"
                                 : "bg-neutral-200 dark:bg-neutral-800"
                           )}
                        />
                     ))}
                  </div>
               </div>
            </Heading>
            <LetterTypeForm
               data={data}
               setData={setData}
               errors={errors}
               onNameChange={changeName}
               onCategoryChange={changeCategory}
            />
            <ActionBar
               message={
                  isFormComplete ? (
                     <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ Semua field telah terisi</span>
                  ) : (
                     <span>{totalFields - filledFields} field belum terisi</span>
                  )
               }
            >
               <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  disabled={processing}
                  onClick={() => setShowResetModal(true)}>
                  <RotateCcw className="size-4" />
                  Reset
               </Button>
               <Button
                  type="button"
                  variant="default"
                  size="sm"
                  className="cursor-pointer font-bold"
                  disabled={processing || !isFormComplete}
                  onClick={() => setShowSaveModal(true)}>
                  <Save className="size-4 shrink-0" />
                  {processing ? 'Menyimpan...' : 'Simpan'}
               </Button>
            </ActionBar>
         </form>

         <ConfirmModal
            isOpen={showResetModal}
            onClose={() => setShowResetModal(false)}
            onConfirm={() => {
               reset();
               setShowResetModal(false);
            }}
            title="Reset Formulir?"
            description="Semua data yang telah Anda isi akan dihapus and form akan kembali kosong."
            confirmText="Ya, Reset"
            variant="destructive"
         />

         <ConfirmModal
            isOpen={showSaveModal}
            onClose={() => setShowSaveModal(false)}
            onConfirm={submit}
            title="Simpan Data?"
            description="Pastikan semua informasi yang Anda masukkan sudah benar sebelum menyimpan."
            confirmText="Ya, Simpan"
            variant="emerald"
            loading={processing}
         />
      </FeatureLayout>
   );
}
