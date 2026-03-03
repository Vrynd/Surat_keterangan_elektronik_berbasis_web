import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { unslugify } from '@/lib/utils';

export default function SubmissionLetter() {
   const { url } = usePage();
   const params = new URLSearchParams(url.split('?')[1] || '');
   const letterType = unslugify(params.get('type') || 'Pengajuan Surat');

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

   return (
      <FeatureLayout
         title={letterType}
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               {letterType}
            </h1>
         }

      >
         <div className="space-y-8">
            <Heading
               title="Formulir Pengajuan"
               description="Isi formulir di bawah ini dengan informasi yang benar dan valid."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
               <div className="lg:col-span-7">
                  <div className="relative h-[600px] overflow-hidden rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50">
                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-neutral-400">Area Formulir</span>
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-5">
                  <div className="relative h-[600px] overflow-hidden rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/50">
                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/10 dark:stroke-neutral-100/10" />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-neutral-400">Area Pratinjau</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </FeatureLayout>
   );
}

