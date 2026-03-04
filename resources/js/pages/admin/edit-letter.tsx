import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Save, Trash2, X } from 'lucide-react';
import { router } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import FormPlaceholder from '@/components/form-placeholder';

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

export default function EditLetter() {
   return (
      <FeatureLayout
         title="Edit Surat"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Edit Jenis Surat
            </h1>
         }>
         <div className="space-y-8">
            <Heading
               title="Informasi Surat"
               description="Perbarui detail surat keterangan di bawah ini"
               action={
                  <div className="flex items-center gap-3">
                     <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => router.get('/dashboard')}>
                        <X className="size-4 shrink-0" />
                        Batal
                     </Button>
                     <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => console.log('Delete clicked')}>
                        <Trash2 className="size-4 shrink-0" />
                        Hapus
                     </Button>
                     <Button
                        variant="default"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => console.log('Save changes clicked')}>
                        <Save className="size-4 shrink-0" />
                        Simpan Perubahan
                     </Button>
                  </div>
               }
            />

            <FormPlaceholder letterType="Edit Surat" />
         </div>
      </FeatureLayout>
   );
}
