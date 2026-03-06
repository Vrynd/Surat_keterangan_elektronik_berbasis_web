import React from 'react';
import { Search, FileText, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
   variant?: 'base' | 'search';
   title?: string;
   description?: string | React.ReactNode;
   icon?: LucideIcon;
   searchQuery?: string;
   action?: React.ReactNode;
   className?: string;
}

export function EmptyState({
   variant = 'base',
   title,
   description,
   icon: Icon,
   searchQuery,
   action,
   className,
}: EmptyStateProps) {
   const isSearch = variant === 'search';

   // Default values based on variant
   const defaultTitle = isSearch ? "Hasil tidak ditemukan" : "Belum ada data";
   const defaultIcon = isSearch ? FileText : FileText;

   const EffectiveIcon = Icon || defaultIcon;

   return (
      <div className={cn(
         "flex flex-col items-center justify-center py-20 px-6 bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 transition-all duration-300",
         className
      )}>
         <div className="relative mb-6">
            <div className="size-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/50 dark:border-neutral-700/50">
               <EffectiveIcon className="size-8 text-neutral-400" />
            </div>
            {isSearch && (
               <div className="absolute -bottom-1 -right-1 size-8 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center shadow-sm border border-neutral-100 dark:border-neutral-700 animate-in zoom-in duration-300">
                  <Search className="size-4 text-emerald-500" strokeWidth={2.5} />
               </div>
            )}
         </div>

         <h3 className="text-xl font-bold text-neutral-900 dark:text-white text-center">
            {title || defaultTitle}
         </h3>

         <div className="text-md text-neutral-500 max-w-md text-center mt-2 leading-relaxed">
            {description || (
               isSearch ? (
                  <>
                     Maaf, kami tidak menemukan layanan untuk <span className="text-neutral-900 dark:text-neutral-200 font-bold italic">"{searchQuery}"</span>. Coba sesuaikan kata kunci atau kategori.
                  </>
               ) : (
                  "Saat ini belum ada data tersedia untuk ditampilkan."
               )
            )}
         </div>

         {action && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               {action}
            </div>
         )}
      </div>
   );
}
