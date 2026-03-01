import { usePage } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import UserFeatureLayout from '@/layouts/feature-layout';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Dashboard',
      href: dashboard(),
   },
];

export default function Dashboard() {
   const { auth } = usePage().props;

   return (
      <UserFeatureLayout
         title="Dashboard"
         breadcrumbs={breadcrumbs}
         header={
            <h1 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-white">
               Hi, {auth.user.name.split(' ').slice(0, 2).join(' ')}! 👋
            </h1>
         }
      >
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
      </UserFeatureLayout>
   );
}
