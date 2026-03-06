import React from 'react';
import { useForm } from '@inertiajs/react';
import { RotateCcw, Save } from 'lucide-react';
import { isFormValid } from '@/lib/validation';
import Heading from '@/components/heading';
import FeatureLayout from '@/layouts/feature-layout';
import LetterInfo from '@/components/letter-info';
import { Button } from '@/components/ui/button';
import { LetterTypeForm } from '@/components/forms/letter-type-form';
import { letterTypeSchema } from '@/components/forms/validation.schema';
import type { BreadcrumbItem } from '@/types';
import { ConfirmModal } from '@/components/confirm-modal';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
   {
      title: 'Tambah Surat Baru',
      href: '/admin/add-letter',
   },
];

export default function AddLetter({ lastAddedDate }: { lastAddedDate: string | null }) {
   // 
   const { data, setData, post, processing, errors, reset } = useForm({
      code: '',
      name: '',
      category: '' as any,
      description: '',
      processing_time: '',
   });

   const [showResetModal, setShowResetModal] = useState(false);
   const [showSaveModal, setShowSaveModal] = useState(false);

   // 
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

   // 
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

   // 
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

   // 
   const submit = (e?: React.FormEvent) => {
      e?.preventDefault();
      post('/admin/letter-types', {
         onSuccess: () => setShowSaveModal(false),
      });
   };

   // 
   const isFormComplete = isFormValid(data, letterTypeSchema);
   return (
      <FeatureLayout
         title="Tambah Surat"
         breadcrumbs={breadcrumbs}
         header={
            <div className="flex flex-col gap-1">
               <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Tambah Surat Keterangan</h1>
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
         <div className="space-y-8">
            <Heading
               title="Informasi Dasar"
               description="Lengkapi detail di bawah ini untuk menambahkan jenis surat keterangan baru"
               action={
                  <div className="flex items-center gap-3">
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
                        variant="emerald"
                        size="sm"
                        className="cursor-pointer font-bold"
                        disabled={processing || !isFormComplete}
                        onClick={() => setShowSaveModal(true)}>
                        <Save className="size-4 shrink-0" />
                        {processing ? 'Menyimpan...' : 'Simpan'}
                     </Button>
                  </div>
               }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
               <div className="lg:col-span-8">
                  <form id="add-letter-form" onSubmit={submit} className="space-y-6">
                     <LetterTypeForm
                        data={data}
                        setData={setData}
                        errors={errors}
                        onNameChange={changeName}
                        onCategoryChange={changeCategory}
                     />
                  </form>
               </div>

               <div className="lg:col-span-4">
                  <LetterInfo variant="admin" data={data} />
               </div>
            </div>
         </div>
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
