import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

import FormPlaceholder from '@/components/form-placeholder';

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

export default function AddLetter() {
   return (
      <FeatureLayout
         title="Tambah Surat Baru"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Buat Surat Baru
            </h1>
         }>
         <div className="space-y-8">
            <Heading
               title="Informasi Surat"
               description="Lengkapi detail di bawah ini untuk menambahkan jenis surat keterangan baru"
               action={
                  <div className="flex items-center gap-3">
                     <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => window.location.reload()}>
                        <RotateCcw className="size-4" />
                        Reset Form
                     </Button>
                     <Button
                        variant="default"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => console.log('Save clicked')}>
                        <Save className="size-4" />
                        Simpan Jenis Surat
                     </Button>
                  </div>
               }
            />

            <FormPlaceholder letterType="Tambah Surat Baru" />
         </div>
      </FeatureLayout>
   );
}
