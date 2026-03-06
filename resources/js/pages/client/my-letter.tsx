import { CategoryTabs } from '@/components/category-tabs';
import { EmptyState } from '@/components/empty-state';
import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import FeatureLayout from '@/layouts/feature-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { FileText, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: '/client/dashboard',
   },
   {
      title: 'Surat Saya',
      href: '/client/my-letters',
   },
];

const statusItems = [
   { value: 'all', label: 'Semua' },
   { value: 'pending', label: 'Diproses' },
   { value: 'approved', label: 'Selesai' },
   { value: 'rejected', label: 'Ditolak' },
] as const;

export default function MyLetter() {
   const { auth } = usePage().props;

   // 
   const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
   const initialSearch = urlParams.get('search') || '';
   const initialStatus = urlParams.get('status') || 'all';

   // 
   const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
   const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

   // Mock counts - will be updated with real data later
   const counts = {
      all: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
   };

   // 
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         const params: Record<string, any> = {};
         if (searchQuery) params.search = searchQuery;
         if (selectedStatus !== 'all') params.status = selectedStatus;

         router.get(window.location.pathname, params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
         });
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [searchQuery, selectedStatus]);

   return (
      <FeatureLayout
         title="Surat Saya"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Surat Saya
            </h1>
         }
      >
         <div className="space-y-8">
            <Heading
               title="Riwayat Pengajuan Surat"
               description="Pantau status dan unduh hasil pengajuan surat keterangan Anda di sini."
            >
               <div className="flex-1 relative w-full group/search">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 group-focus-within/search:text-emerald-500 transition-colors" />
                  <Input
                     placeholder="Cari surat berdasarkan jenis atau nomor..."
                     className={cn(
                        "h-11 pl-10 bg-white dark:bg-neutral-900",
                        searchQuery ? "pr-10" : "pr-10"
                     )}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                     <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                     >
                        <X className="h-4 w-4" />
                     </button>
                  )}
               </div>
               <div className="flex-none">
                  <CategoryTabs
                     value={selectedStatus}
                     onValueChange={setSelectedStatus}
                     items={statusItems}
                     counts={counts}
                  />
               </div>
            </Heading>

            <div className="flex flex-col gap-4">
               {searchQuery ? (
                  <EmptyState
                     variant="search"
                     searchQuery={searchQuery}
                  />
               ) : (
                  <EmptyState
                     variant="base"
                     icon={FileText}
                     title="Belum Ada Pengajuan Surat"
                     description="Anda belum memiliki riwayat pengajuan surat. Mulai ajukan surat keterangan Anda melalui menu Dashboard."
                  />
               )}
            </div>
         </div>
      </FeatureLayout>
   );
}
