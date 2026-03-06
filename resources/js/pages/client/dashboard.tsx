declare const route: any;
import FeatureLayout from '@/layouts/feature-layout';
import { router, usePage } from '@inertiajs/react';
import { Search, X, FileText, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Heading from '@/components/heading';
import { CategoryTabs } from '@/components/category-tabs';
import { CertificateCard } from '@/components/certificate-card';
import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: [BreadcrumbItem, ...BreadcrumbItem[]] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
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
         breadcrumbs={breadcrumbs}
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
               {filteredServices.length > 0 ? (
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
                  <div className="flex flex-col items-center justify-center py-20 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800">
                     <div className="relative mb-6">
                        <div className="size-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
                           <FileText className="size-8 text-neutral-400" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-700">
                           <Search className="size-4 text-emerald-500" strokeWidth={2.5} />
                        </div>
                     </div>
                     <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Hasil tidak ditemukan</h3>
                     <p className="text-md text-neutral-500 max-w-lg text-center mt-2 leading-relaxed">
                        Maaf, kami tidak menemukan layanan untuk <span className="text-neutral-900 dark:text-neutral-200 font-medium">"{searchQuery}"</span>. Coba sesuaikan kata kunci atau kategori.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </FeatureLayout>
   );
}
