import Heading from '@/components/heading';
import LetterInfo from '@/components/letter-info';
import { LetterTypeForm } from '@/components/forms/letter-type-form';
import { letterTypeSchema } from '@/components/forms/validation.schema';
import { Button } from '@/components/ui/button';
import FeatureLayout from '@/layouts/feature-layout';
import { isFormValid } from '@/lib/validation';
import type { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
   {
      title: 'Edit Surat',
      href: '/admin/edit-letter',
   },
];

interface LetterType {
   id: number;
   code: string;
   name: string;
   category: 'kependudukan' | 'ekonomi' | 'sosial';
   description: string;
   processing_time: string;
}

export default function EditLetter() {
   // 
   const { services } = usePage<{ services: LetterType[] }>().props;

   //
   const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
   const id = parseInt(urlParams.get('id') || '0');
   const letterData = services?.find(s => s.id === id);

   // 
   const { data, setData, put, delete: destroy, processing, errors, reset } = useForm({
      code: letterData?.code || '',
      name: letterData?.name || '',
      category: (letterData?.category || 'kependudukan') as 'kependudukan' | 'ekonomi' | 'sosial',
      description: letterData?.description || '',
      processing_time: letterData?.processing_time || '',
   });

   // 
   useEffect(() => {
      if (letterData) {
         setData({
            code: letterData.code,
            name: letterData.name,
            category: letterData.category,
            description: letterData.description,
            processing_time: letterData.processing_time,
         });
      }
   }, [letterData]);

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

      const oldGenerated = generateCode(letterData?.name || '', letterData?.category || 'kependudukan');
      if (!data.code || data.code === oldGenerated) {
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
      if (!data.code || data.code === currentGenerated) {
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
   const submit = (e: React.FormEvent) => {
      e.preventDefault();
      put(`/admin/letter-types/${id}`);
   };

   const deleteLetter = () => {
      if (confirm('Apakah Anda yakin ingin menghapus jenis surat ini?')) {
         destroy(`/admin/letter-types/${id}`);
      }
   };

   if (!letterData) {
      return (
         <FeatureLayout title="Error" breadcrumbs={breadcrumbs}>
            <div className="py-20 text-center">
               <h2 className="text-xl font-bold">Surat tidak ditemukan</h2>
               <Button variant="link" onClick={() => window.history.back()}>Kembali</Button>
            </div>
         </FeatureLayout>
      );
   }
   const isFormComplete = isFormValid(data, letterTypeSchema);

   return (
      <FeatureLayout
         title="Edit Surat"
         breadcrumbs={breadcrumbs}
         header={
            <div className="flex flex-col gap-1">
               <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Edit: {letterData.name}</h1>
               <p className="text-sm text-neutral-500">ID Surat: #{letterData.id} • Terakhir diperbarui {new Date().toLocaleDateString('id-ID')}</p>
            </div>
         }>
         <div className="space-y-8">
            <Heading
               title="Perbarui Informasi"
               description="Perbarui detail surat keterangan di bawah ini"
               action={
                  <div className="flex items-center gap-3">
                     <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        disabled={processing}
                        onClick={() => window.history.back()}>
                        <X className="size-4" />
                        Batal
                     </Button>
                     <Button
                        form="edit-letter-form"
                        type="submit"
                        variant="emerald"
                        size="sm"
                        className="cursor-pointer font-bold"
                        disabled={processing || !isFormComplete}>
                        <Save className="size-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                     </Button>
                  </div>
               }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               <div className="lg:col-span-8">
                  <form id="edit-letter-form" onSubmit={submit} className="space-y-6">
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
                  <LetterInfo
                     variant="admin"
                     data={data}
                     letterId={String(letterData?.id)}
                     showStats
                     showDangerZone
                     onDelete={deleteLetter}
                     processing={processing}
                  />
               </div>
            </div>
         </div>
      </FeatureLayout>
   );
}
