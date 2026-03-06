import { EmptyState } from '@/components/empty-state';
import Heading from '@/components/heading';
import FeatureLayout from '@/layouts/feature-layout';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/client/dashboard',
   },
   {
      title: 'Ulasan',
      href: '/client/reviews',
   },
];

export default function Review() {
   const { auth } = usePage().props;

   return (
      <FeatureLayout
         title="Ulasan"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Ulasan Layanan
            </h1>
         }
      >
         <div className="space-y-8">
            <Heading
               title="Ulasan & Testimoni"
               description="Lihat apa yang masyarakat katakan tentang kualitas layanan kami."
            />

            <div className="flex flex-col gap-4">
               <EmptyState
                  variant="base"
                  icon={Star}
                  title="Belum Ada Ulasan"
                  description="Saat ini belum ada ulasan yang diberikan oleh masyarakat. Ulasan Anda sangat berharga bagi kami."
               />
            </div>
         </div>
      </FeatureLayout>
   );
}
