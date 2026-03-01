import { ReactNode } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem } from '@/types';

interface FeatureLayoutProps {
   children: ReactNode;
   header?: ReactNode;
   description?: ReactNode;
   title: string;
   breadcrumbs?: BreadcrumbItem[];
}

export default function FeatureLayout({
   children,
   header,
   description,
   title,
   breadcrumbs = [],
}: FeatureLayoutProps) {
   return (
      <AppLayout breadcrumbs={[]}>
         <Head title={title} />
         <div className="flex flex-col gap-10 px-5 py-12">
            <div className="flex flex-col gap-1">
               <div className="flex items-center justify-between border-b border-gray-100 pb-2 dark:border-neutral-800">
                  <div className="flex flex-col gap-1">
                     {header && <div className="flex flex-col">{header}</div>}
                     {description && (
                        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                           {description}
                        </p>
                     )}
                  </div>

                  {breadcrumbs.length > 1 && (
                     <div className="hidden sm:block">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                     </div>
                  )}
               </div>
            </div>

            <div className="min-h-screen rounded-xl border border-gray-100 bg-white p-7 dark:border-gray-800 dark:bg-neutral-900">
               {children}
            </div>
         </div>
      </AppLayout>
   );
}
