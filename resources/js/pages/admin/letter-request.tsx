import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import { EmptyState } from '@/components/empty-state';
import { StatCard, statCardsConfig } from '@/components/stat-card';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';

const breadcrumbs: [BreadcrumbItem, ...BreadcrumbItem[]] = [
   {
      title: 'Dashboard',
      href: '/admin/dashboard',
   },
   {
      title: 'Pengajuan Surat',
      href: '/admin/letter-requests',
   },
];

interface PaginatedResponse {
   current_page: number;
   last_page: number;
   per_page: number;
   total: number;
   from: number | null;
   to: number | null;
   links: Array<{
      url: string | null;
      label: string;
      active: boolean;
   }>;
}

interface Props {
   requests: PaginatedResponse;
   counts: Record<string, number>;
   filters: {
      status: string;
      search: string;
   };
}

export default function LetterRequest() {
   const { counts } = usePage<{ props: Props }>().props as unknown as Props;

   return (
      <FeatureLayout
         title="Pengajuan Surat"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Pengajuan Surat Masuk
            </h1>
         }>
         <div className="space-y-8">
            <Heading
               title="Daftar Pengajuan"
               description="Kelola dan tinjau seluruh pengajuan surat keterangan dari masyarakat">
               <div className="flex-1 relative w-full group/search">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {statCardsConfig.map((stat) => (
                        <StatCard
                           key={stat.key}
                           label={stat.label}
                           value={counts[stat.key] || 0}
                           icon={stat.icon}
                           gradient={stat.gradient}
                           bg={stat.bg}
                           textColor={stat.textColor}
                        />
                     ))}
                  </div>
               </div>
            </Heading>

            <EmptyState
               title="Belum ada pengajuan surat"
               description="Saat ini belum ada pengajuan surat masuk. Notifikasi akan muncul di sini ketika ada pengajuan baru."
               icon={Mail}
            />
         </div>
      </FeatureLayout>
   );
}
