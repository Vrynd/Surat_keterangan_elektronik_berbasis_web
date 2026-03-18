import FeatureLayout from '@/layouts/feature-layout';
import Heading from '@/components/heading';
import { EmptyState } from '@/components/empty-state';
import { StatCard, statCardsConfig, getStatusConfig } from '@/components/stat-card';
import type { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { Mail } from 'lucide-react';
import { Pagination, type PaginationMeta } from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { LetterRequestActions } from '@/components/letter-request-actions';
import { cn } from '@/lib/utils';

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

interface LetterRequest {
   id: number;
   status: 'pending' | 'approved' | 'rejected';
   submitted_at: string;
   user: {
      name: string;
      email: string;
   };
   letter_type: {
      name: string;
   };
   form_data: Record<string, any>;
}

interface Props {
   requests: PaginationMeta & { data: LetterRequest[] };
   counts: Record<string, number>;
}

export default function LetterRequest() {
   const { requests, counts } = usePage<{ props: Props }>().props as unknown as Props;

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

            {requests.data.length > 0 ? (
               <Card className="cursor-pointer border-neutral-200 dark:border-neutral-800 shadow-none overflow-hidden p-0 gap-0">
                  <CardContent className="p-0">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                           <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                              <tr>
                                 <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Pemohon</th>
                                 <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Jenis Surat</th>
                                 <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Tgl. Pengajuan</th>
                                 <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300">Status</th>
                                 <th className="px-6 py-4 font-semibold text-neutral-700 dark:text-neutral-300 text-right">Aksi</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                              {requests.data.map((req) => {
                                 const statusConfig = getStatusConfig(req.status);
                                 return (
                                    <tr key={req.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/50 transition-colors">
                                       <td className="px-6 py-4">
                                          <div className="flex flex-col">
                                             <span className="font-bold text-neutral-900 dark:text-neutral-100">{req.user.name}</span>
                                             <span className="text-xs text-neutral-500">{req.user.email}</span>
                                          </div>
                                       </td>
                                       <td className="px-6 py-4">
                                          <span className="font-medium">{req.letter_type.name}</span>
                                       </td>
                                       <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                                          {new Date(req.submitted_at).toLocaleDateString('id-ID', {
                                             day: 'numeric',
                                             month: 'long',
                                             year: 'numeric'
                                          })}
                                       </td>
                                       <td className="px-6 py-4">
                                          <Badge className={cn("px-2 py-0.5 border flex items-center gap-1.5 w-fit", statusConfig.badgeClass)}>
                                             <div className={cn("size-1.5 rounded-full", statusConfig.dotClass)} />
                                             {statusConfig.label}
                                          </Badge>
                                       </td>
                                       <td className="px-6 py-4 text-right">
                                          <LetterRequestActions request={req} />
                                       </td>
                                    </tr>
                                 );
                              })}
                           </tbody>
                        </table>
                     </div>
                  </CardContent>
                  <Pagination pagination={requests} />
               </Card>
            ) : (
               <EmptyState
                  title="Belum ada pengajuan surat"
                  description="Saat ini belum ada pengajuan surat masuk. Notifikasi akan muncul di sini ketika ada pengajuan baru."
                  icon={Mail}
               />
            )}
         </div>
      </FeatureLayout>
   );
}
