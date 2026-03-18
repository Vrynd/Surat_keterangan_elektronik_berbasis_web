import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
   ClipboardList,
   Clock,
   CheckCircle2,
   XCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';


interface StatCardProps {
   label: string;
   value: number;
   icon: LucideIcon;
   gradient: string;
   bg: string;
   textColor: string;
   className?: string;
}

export const statCardsConfig = [
   {
      key: 'all',
      label: 'Total Pengajuan',
      icon: ClipboardList,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      textColor: 'text-blue-700 dark:text-blue-300',
   },
   {
      key: 'pending',
      label: 'Menunggu',
      icon: Clock,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      textColor: 'text-amber-700 dark:text-amber-300',
   },
   {
      key: 'approved',
      label: 'Disetujui',
      icon: CheckCircle2,
      gradient: 'from-emerald-500 to-teal-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      textColor: 'text-emerald-700 dark:text-emerald-300',
   },
   {
      key: 'rejected',
      label: 'Ditolak',
      icon: XCircle,
      gradient: 'from-red-500 to-rose-600',
      bg: 'bg-red-50 dark:bg-red-950/20',
      textColor: 'text-red-700 dark:text-red-300',
   },
];

export function getStatusConfig(status: string) {
   switch (status) {
      case 'pending':
         return {
            label: 'Menunggu',
            badgeClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-800',
            dotClass: 'bg-amber-500',
         };
      case 'approved':
         return {
            label: 'Disetujui',
            badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
            dotClass: 'bg-emerald-500',
         };
      case 'rejected':
         return {
            label: 'Ditolak',
            badgeClass: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800',
            dotClass: 'bg-red-500',
         };
      default:
         return {
            label: status,
            badgeClass: 'bg-neutral-50 text-neutral-700 border-neutral-200',
            dotClass: 'bg-neutral-500',
         };
   }
}

export function StatCard({
   label,
   value,
   icon: Icon,
   gradient,
   bg,
   textColor,
   className,
}: StatCardProps) {
   return (
      <Card className={cn(
         'relative overflow-hidden border-neutral-200 dark:border-neutral-800 shadow-none py-0 cursor-pointer',
         bg,
         className
      )}>
         <CardContent className="p-5">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                     {label}
                  </p>
                  <p className={cn('text-3xl font-black tracking-tight', textColor)}>
                     {value}
                  </p>
               </div>
               <div className={cn(
                  'size-12 rounded-xl bg-linear-to-br flex items-center justify-center shadow-lg',
                  gradient
               )}>
                  <Icon className="size-6 text-white" />
               </div>
            </div>
            <div className={cn(
               'absolute -bottom-4 -right-4 size-24 rounded-full opacity-[0.07]',
               `bg-linear-to-br ${gradient}`
            )} />
         </CardContent>
      </Card>
   );
}

