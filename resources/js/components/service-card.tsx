import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type LucideIcon, Clock, FileText, ChevronRight, Shield, BadgeCheck, Briefcase, Fingerprint } from "lucide-react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";

interface ServiceCardProps {
   id: string;
   name: string;
   description: string;
   processingTime: string;
   category: 'kependudukan' | 'ekonomi' | 'sosial';
   previewBody?: string[];
}

const CATEGORY_STYLES = {
   kependudukan: {
      color: 'text-emerald-700 dark:text-emerald-400',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      border: 'border-emerald-300/50 dark:border-emerald-800/50',
      icon: Fingerprint
   },
   ekonomi: {
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20',
      border: 'border-amber-200/50 dark:border-amber-800/50',
      icon: Briefcase
   },
   sosial: {
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50/50 dark:bg-blue-950/20',
      border: 'border-blue-200/50 dark:border-blue-800/50',
      icon: BadgeCheck
   }
};

export function ServiceCard({ id, name, description, processingTime, category, previewBody = [] }: ServiceCardProps) {
   const style = CATEGORY_STYLES[category];
   const WatermarkIcon = style.icon;

   return (
      <Card className="p-5 flex flex-col h-full gap-4 border-neutral-200 dark:border-neutral-800 shadow-none transition-none group overflow-hidden">
         <CardHeader className="p-0 space-y-0">
            <CardTitle className="text-base font-bold text-neutral-900 dark:text-white line-clamp-1">
               {name}
            </CardTitle>
         </CardHeader>
         {/* Visual Preview Section - Opsi 3: Physical Realism (Optimized for fit) */}
         <div className={`relative aspect-16/10 p-5 ${style.bg} border ${style.border} rounded-xl flex items-center justify-center overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/5 dark:stroke-neutral-100/5" />

            <div className="relative z-10 w-full h-full bg-[#fdfdfd] dark:bg-neutral-950 rounded-[4px] border border-neutral-200/60 dark:border-neutral-800/60 flex flex-col overflow-hidden -rotate-1 shadow-[0_12px_24px_-8px_rgba(0,0,0,0.15)]
            transition-all duration-500 group-hover:rotate-0 group-hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.2)]">
               <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

               <div className={`relative flex items-center justify-between border-b-2 ${style.border} bg-white dark:bg-neutral-900 px-3 h-8`}>
                  <div className="flex items-center gap-1.5 z-10">
                     <div className={`size-1.5 rounded-full ${style.color.replace('text-', 'bg-')} shadow-sm`} />
                     <div className="size-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800" />
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <p className={`text-[5.5px] font-black uppercase tracking-[0.4em] ${style.color} opacity-40`}>
                        AUTHENTIC DIGITAL RECORD • SN-00{id}29
                     </p>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-0 pointer-events-none">
                     <div className="size-1.5 rounded-full bg-neutral-100" />
                     <div className="size-1.5 rounded-full bg-neutral-100" />
                  </div>
               </div>

               <div className="p-3 flex-1 flex flex-col items-center overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                     <div className={`opacity-[0.03] dark:opacity-[0.05] scale-[1.6] -rotate-12 transition-transform duration-700 group-hover:-rotate-6 mt-4`}>
                        <WatermarkIcon className={`size-32 ${style.color}`} />
                     </div>

                     <div className={`absolute -bottom-6 -left-6 opacity-[0.02] dark:opacity-[0.04] rotate-45`}>
                        <WatermarkIcon className={`size-24 ${style.color}`} />
                     </div>
                  </div>

                  <div className="text-center mb-3 z-10">
                     <p className="text-[8px] font-black tracking-[0.25em] text-neutral-900 dark:text-white uppercase leading-none mb-1">REPUBLIK INDONESIA</p>
                     <p className={`text-[7px] font-bold text-neutral-500 dark:text-neutral-400 tracking-[0.15em] uppercase opacity-70`}>SURAT KETERANGAN ELEKTRONIK</p>
                     <div className={`h-px w-12 mx-auto my-1.5 ${style.color.replace('text-', 'bg-')} opacity-30`} />
                  </div>

                  <div className="w-full grid grid-cols-2 gap-x-5 gap-y-1.5 z-10 px-2 mt-0.5">
                     {previewBody.map((line, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                           <p className="text-[5px] font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest leading-none mb-0.5">{line}</p>
                           <div className="h-[1.5px] w-full bg-neutral-100/50 dark:bg-neutral-900/50 rounded-full overflow-hidden">
                              <div className={`h-full w-[40%] ${style.color.replace('text-', 'bg-')} opacity-20`} />
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="mt-auto w-full flex items-end justify-between z-10 opacity-90">
                     <div className="flex flex-col gap-1 mb-0.5">
                        <div className="h-0.5 w-10 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                        <div className="h-0.5 w-14 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                        <div className="h-0.5 w-12 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
                     </div>

                     <div className="relative group/seal scale-110">
                        <div className={`size-9 rounded-full border-2 border-double ${style.border} flex items-center justify-center bg-white dark:bg-neutral-900 shadow-inner rotate-12 transition-transform duration-500 group-hover/seal:rotate-0`}>
                           <div className={`absolute inset-0.5 rounded-full border border-dashed ${style.border} opacity-30`} />
                           <WatermarkIcon className={`size-4.5 opacity-40 ${style.color}`} />
                        </div>
                        <div className="absolute -top-1 -right-1">
                           <div className={`size-4 rounded-full ${style.color.replace('text-', 'bg-')} flex items-center justify-center shadow-lg border-2 border-white dark:border-neutral-950`}>
                              <ChevronRight className="size-2.5 text-white stroke-3" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/50 to-transparent" />
            </div>
         </div>

         <CardContent className="p-0 flex-1">
            <CardDescription className="text-neutral-500 dark:text-neutral-400 line-clamp-2 text-sm leading-relaxed">
               {description}
            </CardDescription>
         </CardContent>

         <CardFooter className="p-0 pt-4 border-t border-neutral-50 dark:border-neutral-900 mt-auto">
            <div className="grid grid-cols-2 gap-4 w-full items-center">
               <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Clock className="size-4 shrink-0" />
                  <span className="text-xs font-medium truncate">{processingTime}</span>
               </div>
               <Button className="w-full bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-950 font-bold group h-10 px-0">
                  <span className="text-sm">Buat Pengajuan</span>
                  <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
               </Button>
            </div>
         </CardFooter>
      </Card>
   );
}
