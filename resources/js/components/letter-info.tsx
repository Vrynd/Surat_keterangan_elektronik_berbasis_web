import { FileText, Clock, AlertTriangle, Info, BarChart3, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CertificateCard } from '@/components/certificate-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProcessStep {
   label: string;
   desc: string;
}

export interface LetterInfoProps {
   variant?: 'admin' | 'user';
   description?: string;
   processingTime?: string;
   steps?: ProcessStep[];
   extraNotes?: string[];
   data?: {
      name: string;
      description: string;
      category: string;
   };
   letterId?: string;
   showStats?: boolean;
   showDangerZone?: boolean;
   onDelete?: () => void;
   processing?: boolean;
   className?: string;
}

const defaultSteps: ProcessStep[] = [
   { label: 'Isi Formulir', desc: 'Lengkapi data diri dan keperluan' },
   { label: 'Verifikasi Admin', desc: 'Data diperiksa oleh petugas kelurahan' },
   { label: 'Surat Diterbitkan', desc: 'Surat siap diunduh secara digital' },
];

const defaultNotes: string[] = [
   'Pastikan data yang diisi sesuai dengan KTP dan Kartu Keluarga.',
   'Surat berlaku sesuai ketentuan dan dapat diperpanjang.',
   'Tidak dikenakan biaya administrasi.',
];

export default function LetterInfo({
   variant = 'user',
   description,
   processingTime,
   steps = defaultSteps,
   extraNotes = [],
   data,
   letterId = "0",
   showStats = false,
   showDangerZone = false,
   onDelete,
   processing = false,
   className,
}: LetterInfoProps) {
   if (variant === 'admin' && data) {
      return (
         <div className={cn("space-y-6 lg:sticky lg:top-24 text-left", className)}>
            {/* Live Preview */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 px-1">
                  <div className="size-1.5 rounded-full bg-amber-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Live Preview</h3>
               </div>
               <div className="pointer-events-none origin-top opacity-95 transition-opacity">
                  <CertificateCard
                     id={letterId}
                     name={data.name}
                     description={data.description}
                     category={(data.category as any)}
                  />
               </div>
            </div>

            {/* Stats (Optional) */}
            {showStats && (
               <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                     <div className="size-1.5 rounded-full bg-blue-500" />
                     <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Statistik</h3>
                  </div>
                  <Card className="bg-neutral-900 text-white border-neutral-800 overflow-hidden shadow-none">
                     <CardContent className="p-4 space-y-4">
                        <div className="flex items-center gap-3">
                           <BarChart3 className="size-4 text-blue-400" />
                           <h3 className="font-bold text-xs uppercase tracking-wider">Performa</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                           <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                              <p className="text-[8px] text-neutral-500 uppercase font-black">Total</p>
                              <p className="text-sm font-black text-emerald-400">124</p>
                           </div>
                           <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex flex-col items-center">
                              <p className="text-[8px] text-neutral-500 uppercase font-black">Proses</p>
                              <p className="text-sm font-black text-blue-400">1.2d</p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </div>
            )}

            {/* Classification */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 px-1">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Klasifikasi</h3>
               </div>
               <Card className="bg-neutral-900 text-white border-neutral-800 overflow-hidden shadow-none">
                  <CardContent className="px-5 space-y-4">
                     <div className="flex items-center gap-3">
                        <Info className="size-4 text-emerald-400" />
                        <h3 className="font-bold text-sm">Referensi Kode</h3>
                     </div>
                     <div className="space-y-2">
                        {[
                           { code: '470', label: 'Kependudukan' },
                           { code: '500', label: 'Ekonomi' },
                           { code: '460', label: 'Sosial' },
                        ].map((item) => (
                           <div key={item.code} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                              <span className="text-xs font-medium text-neutral-400">{item.label}</span>
                              <span className="font-mono text-emerald-400 font-bold text-sm">{item.code}</span>
                           </div>
                        ))}
                     </div>
                     <p className="text-xs text-neutral-500 leading-relaxed pt-1">
                        Kode dihasilkan otomatis berdasarkan kategori yang dipilih.
                     </p>
                  </CardContent>
               </Card>
            </div>

            {/* Danger Zone (Optional) */}
            {showDangerZone && (
               <div className="space-y-3">
                  <div className="flex items-center gap-2 px-1">
                     <div className="size-1.5 rounded-full bg-red-500" />
                     <h3 className="text-xs font-bold uppercase tracking-widest text-red-500/70">Bahaya</h3>
                  </div>
                  <Card className="border-red-200 dark:border-red-900/30 bg-red-50/10 dark:bg-red-950/5 overflow-hidden">
                     <CardContent className="p-4 space-y-3">
                        <p className="text-xs text-red-600/70 dark:text-red-400/50 leading-relaxed">
                           Tindakan permanen. Data tidak dapat dikembalikan.
                        </p>
                        <Button
                           variant="destructive"
                           size="sm"
                           className="w-full bg-red-600 hover:bg-red-700 font-bold text-[11px] h-8 shadow-lg shadow-red-600/10"
                           onClick={onDelete}
                           disabled={processing}>
                           <Trash2 className="size-3.5 mr-2" />
                           Hapus Permanen
                        </Button>
                     </CardContent>
                  </Card>
               </div>
            )}
         </div>
      );
   }

   // Default / User variant logic
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
            <CardContent>
               <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {description}
               </p>
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
