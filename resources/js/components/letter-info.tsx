import { FileText, Clock, AlertTriangle, Info, CalendarDays, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface ProcessStep {
   label: string;
   desc: string;
}

export interface LetterInfoProps {
   description?: string;
   processingTime?: string;
   validityPeriod?: string;
   isActive?: boolean;
   steps?: ProcessStep[];
   extraNotes?: string[];
   className?: string;
}

const defaultSteps: ProcessStep[] = [
   { label: 'Isi Formulir', desc: 'Lengkapi data diri dan keperluan' },
   { label: 'Verifikasi Berkas', desc: 'Data diperiksa oleh petugas kelurahan' },
   { label: 'Surat Diterbitkan', desc: 'Surat siap diunduh secara digital' },
];

const defaultNotes: string[] = [
   'Pastikan data yang diisi sesuai dengan KTP dan Kartu Keluarga.',
   'Surat berlaku sesuai ketentuan dan dapat diperpanjang.',
   'Tidak dikenakan biaya administrasi.',
];

export default function LetterInfo({
   description,
   processingTime,
   validityPeriod,
   isActive = true,
   steps = defaultSteps,
   extraNotes = [],
   className,
}: LetterInfoProps) {
   const notes = [...defaultNotes, ...extraNotes];

   return (
      <div className={cn("space-y-6", className)}>
         <Card className="border-neutral-200 dark:border-neutral-800 shadow-none gap-3 flex">
            <CardHeader>
               <CardTitle className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  <FileText className="size-4 text-emerald-500" />
                  Tentang Surat
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {description}
               </p>

               <div className="flex flex-wrap gap-4 pt-2 border-t border-neutral-100 dark:border-neutral-900">
                  <div className="flex items-center gap-2">
                     <CalendarDays className="size-3.5 text-neutral-400" />
                     <span className="text-xs text-neutral-500">Masa Berlaku:</span>
                     <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                        {validityPeriod || 'Sesuai Ketentuan'}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     {isActive ? (
                        <CheckCircle2 className="size-3.5 text-emerald-500" />
                     ) : (
                        <XCircle className="size-3.5 text-red-500" />
                     )}
                     <span className="text-xs text-neutral-500">Status:</span>
                     <span className={cn(
                        "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider",
                        isActive
                           ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                           : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                     )}>
                        {isActive ? 'Aktif' : 'Non-Aktif'}
                     </span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <Card className="border-neutral-200 dark:border-neutral-800 shadow-none gap-3 flex">
            <CardHeader>
               <CardTitle className="flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  <Clock className="size-4 text-amber-500" />
                  Estimasi Waktu Proses
               </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               {processingTime && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                     Pengajuan akan diproses dalam waktu <span className="font-semibold text-neutral-800 dark:text-neutral-200">{processingTime}</span> setelah data diterima.
                  </p>
               )}
               <div className="flex flex-col gap-3">
                  {steps.map((item, index) => (
                     <div key={index} className="flex items-start gap-3">
                        <span className="flex items-center justify-center size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0">
                           {index + 1}
                        </span>
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">{item.label}</span>
                           <span className="text-xs text-neutral-500 dark:text-neutral-400">{item.desc}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {notes.length > 0 && (
            <Card className="border-amber-200/60 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-950/10 shadow-none gap-4 flex">
               <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
                     <AlertTriangle className="size-4" />
                     Catatan Penting
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <ul className="space-y-2">
                     {notes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2">
                           <Info className="size-3.5 mt-0.5 text-amber-500 shrink-0" />
                           <span className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
                              {note}
                           </span>
                        </li>
                     ))}
                  </ul>
               </CardContent>
            </Card>
         )}
      </div>
   );
}
