import { Construction } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormPlaceholderProps {
   letterType: string;
   className?: string;
}

export default function FormPlaceholder({ letterType, className }: FormPlaceholderProps) {
   return (
      <div className={cn(
         "flex flex-col items-center justify-center text-center py-16 px-6 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-900/30",
         className,
      )}>
         <div className="flex items-center justify-center size-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 mb-5">
            <Construction className="size-7 text-amber-500" />
         </div>
         <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Formulir Segera Hadir
         </h3>
         <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed mb-6">
            Formulir pengajuan <span className="font-medium text-neutral-700 dark:text-neutral-300">{letterType}</span> sedang dalam tahap pengembangan dan akan segera tersedia.
         </p>
         <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard">
               Kembali ke Dashboard
            </Link>
         </Button>
      </div>
   );
}
