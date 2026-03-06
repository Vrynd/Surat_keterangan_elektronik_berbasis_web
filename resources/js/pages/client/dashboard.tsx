import { CategoryTabs } from '@/components/category-tabs';
import { CertificateCard } from '@/components/certificate-card';
import { EmptyState } from '@/components/empty-state';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FeatureLayout from '@/layouts/feature-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Plus, Search, X, Layers } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const getBreadcrumbs = (role: string): [BreadcrumbItem, ...BreadcrumbItem[]] => [
   {
      title: 'Dashboard',
      href: role === 'admin' ? '/admin/dashboard' : '/client/dashboard',
   },
];

interface Service {
   id: number;
   code: string;
   name: string;
   category: 'kependudukan' | 'ekonomi' | 'sosial';
   description: string;
   processing_time: string;
   body?: string[];
}

export default function Dashboard({ services }: { services: Service[] }) {
   // 
   const { auth } = usePage().props;
   const userRole = auth.user.role;

   // 
   const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
   const initialSearch = urlParams.get('search') || '';
   const initialCategory = urlParams.get('category') || 'all';

   // 
   const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
   const [searchQuery, setSearchQuery] = useState<string>(initialSearch);

   // 
   const counts = {
      all: services.length,
      kependudukan: services.filter((s) => s.category === 'kependudukan').length,
      ekonomi: services.filter((s) => s.category === 'ekonomi').length,
      sosial: services.filter((s) => s.category === 'sosial').length,
   };

   // 
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         const params: Record<string, any> = {};
         if (searchQuery) params.search = searchQuery;
         if (selectedCategory !== 'all') params.category = selectedCategory;

         router.get(window.location.pathname, params, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
         });
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [searchQuery, selectedCategory]);

   // 
   const filteredServices = useMemo(() => {
      return services.filter((service) => {
         const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
         const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
         return matchesCategory && matchesSearch;
      });
   }, [selectedCategory, searchQuery]);

   return (
      <FeatureLayout
         title="Dashboard"
         breadcrumbs={getBreadcrumbs(userRole)}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Hi, {auth.user.name.split(' ').slice(0, 2).join(' ')}! 👋
            </h1>
         }>
         <div className="space-y-8">
            <Heading
               title="Daftar Surat Keterangan"
               description={
                  userRole === 'admin'
                     ? "Kelola daftar surat keterangan yang tersedia untuk masyarakat."
                     : "Pilih dan ajukan surat keterangan Anda dengan mudah dan cepat."
               }
               action={
                  userRole === 'admin' && (
                     <Button
                        variant="emerald"
                        size="sm"
                        className='cursor-pointer'
                        onClick={() => router.get('/admin/add-letter')}>
                        <Plus className="size-5" />
                        Buat Surat Baru
                     </Button>
                  )
               }>
               <div className="flex-1 relative w-full group/search">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500 group-focus-within/search:text-emerald-500 transition-colors" />
                  <Input
                     placeholder="Ketikkan jenis surat yang Anda cari..."
                     className={cn(
                        "h-11 pl-10 bg-white dark:bg-neutral-900",
                        searchQuery ? "pr-32" : "pr-10"
                     )}
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                     {searchQuery && filteredServices.length > 0 && (
                        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md animate-in fade-in zoom-in duration-200 whitespace-nowrap">
                           {filteredServices.length} Layanan
                        </span>
                     )}
                     {searchQuery && (
                        <button
                           onClick={() => setSearchQuery('')}
                           className="pointer-events-auto text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                           <X className="h-4 w-4" />
                        </button>
                     )}
                  </div>
               </div>
               <div className="flex-none">
                  <CategoryTabs
                     value={selectedCategory}
                     onValueChange={setSelectedCategory}
                     counts={counts}
                  />
               </div>
            </Heading>

            <div className="flex flex-col gap-4">
               {services.length === 0 ? (
                  <EmptyState
                     variant="base"
                     icon={Layers}
                     title="Belum Ada Layanan Surat"
                     description={
                        userRole === 'admin'
                           ? "Sistem belum memiliki daftar jenis surat. Mulai dengan membuat layanan surat pertama Anda."
                           : "Mohon maaf, saat ini belum ada layanan surat yang tersedia untuk diajukan."
                     }
                  />
               ) : filteredServices.length > 0 ? (
                  <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                     {filteredServices.map((service) => (
                        <CertificateCard
                           key={service.id}
                           userRole={userRole}
                           id={service.id.toString()}
                           name={service.name}
                           description={service.description}
                           category={service.category}
                           previewDocument={service.body || []}
                           searchQuery={searchQuery}
                        />
                     ))}
                  </div>
               ) : (
                  <EmptyState
                     variant="search"
                     searchQuery={searchQuery}
                  />
               )}
            </div>
         </div>
      </FeatureLayout>
   );
}
