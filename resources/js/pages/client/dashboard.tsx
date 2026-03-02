import { usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { SubHeader } from '@/components/app-sub-header';
import type { BreadcrumbItem } from '@/types';
import FeatureLayout from '@/layouts/feature-layout';

const breadcrumbs: [BreadcrumbItem, ...BreadcrumbItem[]] = [
   {
      title: 'Dashboard',
      href: '/dashboard',
   },
];

interface Service {
   id: string;
   name: string;
   category: 'kependudukan' | 'ekonomi' | 'sosial';
}

const services: Service[] = [];

export default function Dashboard() {
   const { auth } = usePage().props;

   const counts = {
      all: services.length,
      kependudukan: services.filter((s) => s.category === 'kependudukan').length,
      ekonomi: services.filter((s) => s.category === 'ekonomi').length,
      sosial: services.filter((s) => s.category === 'sosial').length,
   };

   return (
      <FeatureLayout
         title="Dashboard"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
               Hi, {auth.user.name.split(' ').slice(0, 2).join(' ')}! 👋
            </h1>
         }
      >
         <div className="space-y-8">
            {/* Sub Header Section */}
            <SubHeader
               title="Layanan Surat Keterangan"
               description="Pilih dan ajukan surat keterangan Anda dengan mudah dan cepat."
            >
               <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  <Input
                     placeholder="Cari jenis surat (contoh: Domisili, SKU...)"
                     className="pl-10 h-11 bg-white dark:bg-neutral-900 w-full"
                  />
               </div>
               <div className="flex-none">
                  <ToggleGroup
                     type="single"
                     defaultValue="all"
                     className="bg-neutral-100 dark:bg-neutral-900 p-1 border border-input rounded-lg h-11">
                     <ToggleGroupItem value="all" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Semua
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.all}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="kependudukan" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Kependudukan
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.kependudukan}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="ekonomi" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Ekonomi
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.ekonomi}
                        </span>
                     </ToggleGroupItem>
                     <ToggleGroupItem value="sosial" className="px-5 h-full text-neutral-500 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-lg gap-2">
                        Sosial
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 data-[state=on]:bg-white/20 data-[state=on]:text-white">
                           {counts.sosial}
                        </span>
                     </ToggleGroupItem>
                  </ToggleGroup>
               </div>
            </SubHeader>

            {/* Grid Content */}
            <div className="flex flex-col gap-4">
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                  </div>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                  </div>
               </div>
               <div className="relative min-h-[500px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                  <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
               </div>
            </div>
         </div>
      </FeatureLayout>
   );
}
