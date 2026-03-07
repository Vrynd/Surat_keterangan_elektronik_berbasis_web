import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import FormPlaceholder from '@/components/form-placeholder';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { unslugify } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function ManageForms() {
   const { auth } = usePage().props;
   const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
   const letterName = unslugify(urlParams.get('name') || 'Surat Keterangan');

   const breadcrumbs: BreadcrumbItem[] = [
      {
         title: 'Dashboard',
         href: '/admin/dashboard',
      },
      {
         title: letterName,
         href: `/admin/edit-letter?id=${urlParams.get('id')}&name=${urlParams.get('name')}`,
      },
      {
         title: 'Kelola Formulir',
         href: '/admin/manage-forms',
      },
   ];

   return (
      <FeatureLayout
         title={letterName}
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Buat & Kelola Formulir
            </h1>
         }
      >

         <div className="space-y-8">
            <Heading
               title={letterName}
               description="Tentukan field input dan persyaratan dokumen yang harus dipenuhi oleh pemohon"
               action={
                  <Button
                     variant="default"
                     size="sm"
                     className='cursor-pointer'
                  >
                     <Plus className="size-5" />
                     Tambah Field
                  </Button>
               }
            />
            <FormPlaceholder
               letterType={letterName}
               className="bg-white dark:bg-neutral-950 border-solid"
            />
         </div>
      </FeatureLayout>
   );
}
